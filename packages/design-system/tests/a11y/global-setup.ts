import { loadStoryIds } from '../_support/ladle'
import { INVENTORY_THEMES } from './exact-inventory'
import { assertInventoryPreflight } from './inventory-protocol'

export default function globalSetup(): void {
  assertInventoryPreflight(
    loadStoryIds().filter((id) => !id.endsWith('--readme')),
    INVENTORY_THEMES
  )
}
