/**
 * Inventory verification script.
 * Compares expected content counts against static data sources.
 *
 * Run: npx tsx scripts/verify-inventory.ts
 */

import { catalogProducts } from '../src/data/products-catalog'
import { solutionsData } from '../src/data/solutions'
import { industriesData } from '../src/data/industries'
import { platformData } from '../src/data/platform'
import { servicesData } from '../src/data/services'
import { blogData } from '../src/data/blog'
import { companyData } from '../src/data/company'
import { legalData } from '../src/data/legal'

type Check = {
  collection: string
  expected: number
  actual: number
}

const checks: Check[] = [
  { collection: 'Products (catalog)', expected: 69, actual: catalogProducts.length },
  { collection: 'Solutions', expected: 38, actual: solutionsData.length },
  { collection: 'Industries', expected: 8, actual: industriesData.length },
  { collection: 'Platforms', expected: 11, actual: platformData.length },
  { collection: 'Services', expected: 5, actual: servicesData.length },
  { collection: 'Blog Posts', expected: 10, actual: blogData.length },
  { collection: 'Company Pages', expected: 6, actual: companyData.length },
  { collection: 'Legal Pages', expected: 4, actual: legalData.length },
]

let hasWarnings = false

console.log('\n--- Inventory Verification ---\n')

for (const check of checks) {
  const status = check.actual === check.expected ? 'OK' : 'WARN'
  const icon = status === 'OK' ? '[OK]' : '[!!]'

  if (status === 'WARN') hasWarnings = true

  console.log(
    `${icon} ${check.collection}: expected ${check.expected}, found ${check.actual}${
      status === 'WARN' ? ` (diff: ${check.actual - check.expected > 0 ? '+' : ''}${check.actual - check.expected})` : ''
    }`,
  )
}

console.log('')

if (hasWarnings) {
  console.log('Some counts differ from expected. Review the data sources.')
  process.exit(1)
} else {
  console.log('All inventory counts match.')
}
