import { expect, test, type Locator, type Page } from '@playwright/test'

// Locks the keyboard and interaction contracts behind the Level A fixes. The
// axe sweep in stories.spec.ts only ever sees a story's default state, so it is
// structurally blind to all of this: a control that renders as a `<div>` with an
// onClick is not an axe violation, a popover that never opens is never scanned
// at all, and an accessible name that silently degrades to a bare digit still
// counts as "named". Every assertion below is driven through real key presses
// and checks attributes or roles, so it stays deterministic under parallel load
// (unlike the color-contrast rules in the axe sweep).
//
// Two kinds of test live here. Table, Workflow, StepProgress, ColorPicker and
// the Navigation name are contracts this branch introduced, and each one has
// been mutation-checked: reverting the fix in the source makes the matching test
// fail. Checkbox, Switch, SelectField and the Navigation dropdown were already
// operable through Radix before the branch touched them, so those tests are
// insurance against a future refactor away from the primitives rather than a
// lock on a fix.

async function gotoStory(page: Page, story: string) {
  await page.goto(`?story=${story}&mode=preview`)
}

// Ladle mounts story content asynchronously after the background div resolves;
// waiting for the control to attach avoids racing ahead of the mount.
async function ready(locator: Locator) {
  await locator.waitFor({ state: 'attached' })
}

// Proves the control is reachable by keyboard alone rather than just clickable.
// This is the regression that matters: the pre-fix Table header and Workflow
// step were `<div onClick>`, which a mouse-driven test would not have caught.
async function tabTo(page: Page, locator: Locator, maxTabs = 15) {
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press('Tab')
    if (await locator.evaluate((el) => el === document.activeElement)) {
      return
    }
  }
  throw new Error(`control not reachable within ${maxTabs} Tab presses`)
}

test.describe('keyboard operability and accessible naming (WCAG Level A)', () => {
  test('Table: sortable header is tabbable and Enter/Space cycle aria-sort', async ({
    page,
  }) => {
    await gotoStory(page, 'table--sorting')
    const header = page.locator('th[aria-sort]')
    await ready(header)
    await expect(header).toHaveAttribute('aria-sort', 'none')

    const sortButton = page.getByRole('button', { name: 'Count' })
    await tabTo(page, sortButton)

    await page.keyboard.press('Enter')
    await expect(header).toHaveAttribute('aria-sort', 'ascending')
    await page.keyboard.press('Enter')
    await expect(header).toHaveAttribute('aria-sort', 'descending')
    // Space must activate the button too — a `<div role="button">` would only
    // have responded to Enter.
    await page.keyboard.press(' ')
    await expect(header).toHaveAttribute('aria-sort', 'ascending')
  })

  test('Checkbox: Space toggles the checked state', async ({ page }) => {
    // Matched by explicit role, not `getByRole`: Ladle's own theme controls put
    // a native `<input type="checkbox">` and `<select>` on every preview page,
    // and those carry the same implicit roles. The explicit attribute also
    // states the real contract — the library's Checkbox is a Radix button that
    // has to declare the role itself.
    const checkbox = page.locator('[role="checkbox"]').first()
    await gotoStory(page, 'checkbox--labelled')
    await ready(checkbox)
    await expect(checkbox).toHaveAttribute('aria-checked', 'false')

    await tabTo(page, checkbox)
    await page.keyboard.press(' ')
    await expect(checkbox).toHaveAttribute('aria-checked', 'true')
    await page.keyboard.press(' ')
    await expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  test('Switch: Space toggles the checked state', async ({ page }) => {
    const switchControl = page.getByRole('switch').first()
    await gotoStory(page, 'switch--default')
    await ready(switchControl)
    await expect(switchControl).toHaveAttribute('aria-checked', 'false')

    await tabTo(page, switchControl)
    await page.keyboard.press(' ')
    await expect(switchControl).toHaveAttribute('aria-checked', 'true')
    await page.keyboard.press(' ')
    await expect(switchControl).toHaveAttribute('aria-checked', 'false')
  })

  test('SelectField: Enter opens, Escape closes and returns focus', async ({
    page,
  }) => {
    const trigger = page.locator('[role="combobox"]').first()
    await gotoStory(page, 'select-field--default')
    await ready(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await tabTo(page, trigger)
    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('listbox')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    // Focus return is the part a dismissal can silently break: without it the
    // keyboard user is dropped back at the top of the document.
    await expect(trigger).toBeFocused()
  })

  test('Navigation: dropdown opens on Enter, Escape closes it and returns focus', async ({
    page,
  }) => {
    const trigger = page.getByRole('menuitem', { name: 'Dropdown Menu' })
    await gotoStory(page, 'navigation--dropdown')
    await ready(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await tabTo(page, trigger)
    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('menu')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('menu')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('Navigation: an action item is named, keyboard-operable and claims no menu', async ({
    page,
  }) => {
    const fired: string[] = []
    page.on('dialog', (dialog) => {
      fired.push(dialog.message())
      dialog.dismiss()
    })
    // The icon-only trigger carries its accessible name only through the
    // `ariaLabel` prop that batch 1 made required.
    const trigger = page.getByRole('menuitem', { name: 'Support' })
    await gotoStory(page, 'navigation--icon-trigger')
    await ready(trigger)

    // Radix's MenubarTrigger advertises a menu unconditionally. An action item
    // has none, and saying otherwise also wedged the menubar open on activation.
    await expect(trigger).not.toHaveAttribute('aria-haspopup')
    await expect(trigger).not.toHaveAttribute('aria-expanded')
    await expect(trigger).not.toHaveAttribute('aria-controls')

    // Both keys have to reach onClick. Radix default-prevents them for its own
    // menu toggle, which suppressed the native click and left the item operable
    // by mouse only.
    await tabTo(page, trigger)
    await page.keyboard.press('Enter')
    expect(fired).toHaveLength(1)
    await page.keyboard.press(' ')
    expect(fired).toHaveLength(2)
    await expect(trigger).toHaveAttribute('data-state', 'closed')

    // ArrowDown is the menubar's "open this item's menu" key, and it reaches
    // Radix by a different path than Enter/Space.
    await page.keyboard.press('ArrowDown')
    await expect(trigger).toHaveAttribute('data-state', 'closed')
    await expect(page.getByRole('menu')).toHaveCount(0)
  })

  test('Navigation: hovering an action item leaves an open dropdown alone', async ({
    page,
  }) => {
    page.on('dialog', (dialog) => dialog.dismiss())
    const dropdown = page.getByRole('menuitem', { name: 'Dropdown Menu' })
    const actionItem = page.getByRole('menuitem', { name: 'Support' })
    await gotoStory(page, 'navigation--complex')
    await ready(dropdown)

    await dropdown.click()
    await expect(page.getByRole('menu')).toBeVisible()

    // Once a menu is open, the menubar follows the pointer and opens whatever
    // it enters. On an action item that used to dismiss the dropdown the user
    // was reading and wedge the bar open on an item with nothing to show.
    await actionItem.hover()
    await expect(actionItem).toHaveAttribute('data-state', 'closed')
    await expect(dropdown).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('menu')).toBeVisible()
  })

  test('Workflow: Enter activates a step and moves aria-current', async ({
    page,
  }) => {
    // The story's onClick raises an alert(); dismissing it keeps the state
    // update that follows.
    page.on('dialog', (dialog) => dialog.dismiss())
    const secondStep = page.getByRole('button', { name: 'Step 2' })
    await gotoStory(page, 'workflow--default')
    await ready(secondStep)
    await expect(page.getByRole('button', { name: 'Step 1' })).toHaveAttribute(
      'aria-current',
      'step'
    )

    await tabTo(page, secondStep)
    await page.keyboard.press('Enter')
    await expect(secondStep).toHaveAttribute('aria-current', 'step')
    await expect(
      page.getByRole('button', { name: 'Step 1' })
    ).not.toHaveAttribute('aria-current', 'step')
  })

  test('Workflow: a disabled step stays focusable but inert', async ({
    page,
  }) => {
    page.on('dialog', (dialog) => dialog.dismiss())
    const activeStep = page.getByRole('button', { name: 'Step 1' })
    const disabledStep = page.getByRole('button', { name: 'Step 3' })
    await gotoStory(page, 'workflow--disabled')
    await ready(disabledStep)
    await expect(disabledStep).toHaveAttribute('aria-disabled', 'true')
    await expect(activeStep).toHaveAttribute('aria-current', 'step')

    // The step uses aria-disabled rather than the native attribute precisely so
    // that it keeps its tab stop: a keyboard user has to be able to reach it to
    // read the tooltip explaining why it is unavailable. Adding native
    // `disabled` would drop it out of the tab order and pass every other test.
    await tabTo(page, disabledStep)
    await page.keyboard.press('Enter')
    await expect(disabledStep).not.toHaveAttribute('aria-current', 'step')
    await expect(activeStep).toHaveAttribute('aria-current', 'step')
  })

  test('StepProgress: every step keeps a spoken name, with or without a status', async ({
    page,
  }) => {
    await gotoStory(page, 'step-progress--status')
    await ready(page.getByRole('button').first())

    // axe only asserts that a name is non-empty. These are the exact names, so
    // dropping the visually hidden text and leaving the bare digit — which axe
    // would still accept — fails here instead.
    await expect(
      page.getByRole('button', { name: 'Step 1: correct', exact: true })
    ).toHaveCount(1)
    await expect(
      page.getByRole('button', { name: 'Step 2: incorrect', exact: true })
    ).toHaveCount(1)
    await expect(
      page.getByRole('button', { name: 'Step 3', exact: true })
    ).toHaveCount(1)
    await expect(
      page.getByRole('button', {
        name: 'Step 4: partially correct',
        exact: true,
      })
    ).toHaveCount(1)

    await expect(
      page.getByRole('button', { name: 'Step 7', exact: true })
    ).toHaveAttribute('aria-current', 'step')
  })

  // Radix keeps the popover content unmounted while closed, so none of this is
  // ever reachable by the story sweep — it only exists once the popover opens.
  test('ColorPicker: the open popover names its dialog, swatches and hex input, then restores focus', async ({
    page,
  }) => {
    const trigger = page.getByRole('button', { name: 'Pick a color' }).first()
    await gotoStory(page, 'color-picker--default')
    await ready(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await tabTo(page, trigger)
    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Radix always stamps role="dialog"; an unnamed one announces as a bare
    // dialog and swallows the naming work done on the controls inside it.
    const dialog = page.getByRole('dialog', { name: 'Pick a color' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('textbox', { name: 'Color' })).toHaveCount(1)
    // Preset swatches are colour-only buttons; without the label they are the
    // classic "unnamed button" failure.
    const swatches = dialog.getByRole('button', { name: /^Preset color #/ })
    expect(await swatches.count()).toBeGreaterThan(0)

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })
})
