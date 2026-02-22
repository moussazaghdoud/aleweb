import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  const diagnostics: Record<string, unknown> = {}

  // 1. Check sharp
  try {
    const sharp = (await import('sharp')).default
    const info = await sharp(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64')).metadata()
    diagnostics.sharp = { ok: true, format: info.format, width: info.width, height: info.height }
  } catch (e: unknown) {
    diagnostics.sharp = { ok: false, error: (e as Error).message }
  }

  // 2. Check media directory
  const cwd = process.cwd()
  diagnostics.cwd = cwd

  const possibleDirs = [
    path.resolve(cwd, 'public/media'),
    path.resolve(cwd, '../public/media'),
    '/app/public/media',
  ]

  for (const dir of possibleDirs) {
    try {
      const exists = fs.existsSync(dir)
      const writable = exists ? (() => { try { fs.accessSync(dir, fs.constants.W_OK); return true } catch { return false } })() : false
      diagnostics[`dir:${dir}`] = { exists, writable }
    } catch (e: unknown) {
      diagnostics[`dir:${dir}`] = { error: (e as Error).message }
    }
  }

  // 3. Test writing a file
  try {
    const testPath = path.resolve(cwd, 'public/media/test-write.txt')
    fs.writeFileSync(testPath, 'test')
    fs.unlinkSync(testPath)
    diagnostics.writeTest = { ok: true, path: testPath }
  } catch (e: unknown) {
    diagnostics.writeTest = { ok: false, error: (e as Error).message }
  }

  // 4. Node version and platform
  diagnostics.node = process.version
  diagnostics.platform = process.platform
  diagnostics.arch = process.arch

  return NextResponse.json(diagnostics)
}
