import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action')

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    if (!pool?.query) {
      return NextResponse.json({ error: 'No pool' })
    }

    // ── schema-diff: compare Payload's expected tables vs actual DB tables ──
    if (action === 'schema-diff') {
      const db = payload.db as any

      // Get all table names Payload expects from its Drizzle schema
      const expectedTables = Object.keys(db.tables || {}).sort()

      // Get all actual tables in the database
      const result = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' ORDER BY table_name
      `)
      const actualTables = result.rows.map((r: any) => r.table_name).sort()

      // Find missing tables
      const actualSet = new Set(actualTables)
      const missingTables = expectedTables.filter((t: string) => !actualSet.has(t))

      // For each missing table, get column info from Drizzle schema
      const missingDetails: Record<string, string[]> = {}
      for (const tableName of missingTables) {
        const table = db.tables[tableName]
        if (table) {
          const cols = Object.keys(table).filter(
            (k: string) => k !== Symbol.for('drizzle:Name') && !k.startsWith('_')
          )
          missingDetails[tableName] = cols
        }
      }

      // Also check for missing columns in existing tables
      const missingColumns: Record<string, string[]> = {}
      for (const tableName of expectedTables) {
        if (actualSet.has(tableName) && db.tables[tableName]) {
          const expectedCols = Object.keys(db.tables[tableName]).filter(
            (k: string) => typeof db.tables[tableName][k] === 'object' && db.tables[tableName][k]?.name
          )

          const actualCols = await pool.query(`
            SELECT column_name FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = $1
          `, [tableName])
          const actualColSet = new Set(actualCols.rows.map((r: any) => r.column_name))

          const missing = expectedCols.filter((c: string) => {
            const colName = db.tables[tableName][c]?.name
            return colName && !actualColSet.has(colName)
          })

          if (missing.length > 0) {
            missingColumns[tableName] = missing.map((c: string) => db.tables[tableName][c]?.name)
          }
        }
      }

      return NextResponse.json({
        action: 'schema-diff',
        expectedTableCount: expectedTables.length,
        actualTableCount: actualTables.length,
        missingTableCount: missingTables.length,
        missingTables,
        missingColumns,
      })
    }

    // ── sync-schema: create all missing tables using Drizzle schema info ──
    if (action === 'sync-schema') {
      const db = payload.db as any
      const results: Record<string, string> = {}

      // Get existing enum types in the database
      const existingEnums = await pool.query(`
        SELECT typname FROM pg_type WHERE typtype = 'e'
      `)
      const existingEnumSet = new Set(existingEnums.rows.map((r: any) => r.typname))

      // First pass: discover and create all missing enum types from Drizzle enums
      const drizzleEnums = db.enums || {}
      for (const enumName of Object.keys(drizzleEnums)) {
        if (existingEnumSet.has(enumName)) continue
        const enumObj = drizzleEnums[enumName]
        // Drizzle enum has .enumValues array
        const values = enumObj?.enumValues
        if (values && Array.isArray(values) && values.length > 0) {
          const valList = values.map((v: string) => `'${v}'`).join(', ')
          try {
            await pool.query(`CREATE TYPE "${enumName}" AS ENUM (${valList})`)
            results[`enum:${enumName}`] = 'CREATED'
            existingEnumSet.add(enumName)
          } catch (e: any) {
            if (e.message?.includes('already exists')) {
              existingEnumSet.add(enumName)
            } else {
              results[`enum:${enumName}`] = `ERR: ${e.message?.slice(0, 100)}`
            }
          }
        }
      }

      // Get actual tables
      const result = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' ORDER BY table_name
      `)
      const actualSet = new Set(result.rows.map((r: any) => r.table_name))

      // Get all expected tables from Drizzle schema
      const expectedTables = Object.keys(db.tables || {})

      for (const tableName of expectedTables) {
        if (actualSet.has(tableName)) continue // Table exists

        const table = db.tables[tableName]
        if (!table) continue

        // Build CREATE TABLE from Drizzle column definitions
        const columns: string[] = []
        for (const key of Object.keys(table)) {
          const col = table[key]
          if (!col || typeof col !== 'object' || !col.name) continue
          // Skip if it's not a column (could be a relation or index)
          if (!col.dataType && !col.columnType) continue

          let colDef = `"${col.name}"`

          // Map Drizzle types to PostgreSQL types
          const sqlType = col.getSQLType?.() || col.sqlName || 'varchar'
          if (col.primary && sqlType === 'serial') {
            colDef += ' serial PRIMARY KEY'
          } else {
            colDef += ` ${sqlType}`
            if (col.notNull) colDef += ' NOT NULL'
            if (col.hasDefault && col.default !== undefined) {
              const def = typeof col.default === 'function' ? null : col.default
              if (def !== null && def !== undefined) {
                colDef += ` DEFAULT ${typeof def === 'string' ? `'${def}'` : def}`
              }
            }
          }
          columns.push(colDef)
        }

        if (columns.length === 0) continue

        const sql = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columns.join(', ')})`
        try {
          await pool.query(sql)
          results[tableName] = 'CREATED'
        } catch (e: any) {
          results[tableName] = `ERR: ${e.message?.slice(0, 120)}`
        }
      }

      // Also add missing columns to existing tables
      for (const tableName of expectedTables) {
        if (!actualSet.has(tableName)) continue // Already handled above
        const table = db.tables[tableName]
        if (!table) continue

        const actualCols = await pool.query(`
          SELECT column_name FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
        `, [tableName])
        const actualColSet = new Set(actualCols.rows.map((r: any) => r.column_name))

        for (const key of Object.keys(table)) {
          const col = table[key]
          if (!col || typeof col !== 'object' || !col.name) continue
          if (!col.dataType && !col.columnType) continue
          if (actualColSet.has(col.name)) continue // Column exists

          const sqlType = col.getSQLType?.() || col.sqlName || 'varchar'
          const sql = `ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "${col.name}" ${sqlType}`
          try {
            await pool.query(sql)
            results[`${tableName}.${col.name}`] = 'ADDED'
          } catch (e: any) {
            results[`${tableName}.${col.name}`] = `ERR: ${e.message?.slice(0, 100)}`
          }
        }
      }

      // Verify the 3 broken items
      const verify: Record<string, string> = {}
      for (const slug of ['homepage'] as const) {
        try { await payload.findGlobal({ slug }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 200) }
      }
      for (const slug of ['pages', 'company-pages'] as const) {
        try { await payload.find({ collection: slug, limit: 1 }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 200) }
      }

      return NextResponse.json({ action: 'sync-schema', results, verify })
    }

    // ── Default: diagnose all globals and collections ──
    const globalSlugs = ['site-config', 'navigation', 'footer', 'redirects', 'homepage']
    const globalResults: Record<string, string> = {}
    for (const slug of globalSlugs) {
      try {
        await payload.findGlobal({ slug })
        globalResults[slug] = 'OK'
      } catch (err: any) {
        globalResults[slug] = `ERROR: ${err.message?.slice(0, 500)}`
      }
    }

    const collectionSlugs = [
      'users', 'media', 'pages', 'products', 'blog-posts', 'solutions',
      'industries', 'platforms', 'services', 'partners', 'company-pages',
      'legal-pages', 'resources', 'contact-submissions',
    ]
    const collectionResults: Record<string, string> = {}
    for (const slug of collectionSlugs) {
      try {
        await payload.find({ collection: slug as any, limit: 1 })
        collectionResults[slug] = 'OK'
      } catch (err: any) {
        collectionResults[slug] = `ERROR: ${err.message?.slice(0, 200)}`
      }
    }

    return NextResponse.json({ globals: globalResults, collections: collectionResults })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack?.slice(0, 500) })
  }
}
