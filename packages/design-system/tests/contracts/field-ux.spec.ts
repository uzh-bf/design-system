import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

import {
  STORY_SELECTOR,
  TOOLBAR_SELECTOR,
  gotoStory,
  settle,
} from '../_support/ladle'

// Behavioral contract for the field help/error wiring: caller
// `aria-describedby` tokens are deduplicated and stay ahead of the generated
// description/error ids, only rendered nodes are referenced, the tooltip and
// inline error presentations never double-render an alert, hiding an error
// keeps the invalid state while dropping its reference, and clearing a
// validation error releases both the alert and its reference. The RHF
// wrappers share this wiring and render rich descriptions as a block
// container instead of the single-line `FieldDescription` paragraph. The axe
// scans cover the default, invalid inline, and open fixture states, excluding the
// Ladle workbench toolbar (see tests/_support/ladle).

const themes = ['neutral', 'uzh'] as const

const standaloneStory = 'field-ux-contract--standalone'
const rhfStory = 'field-ux-contract--rhf'

// Test-owned fixture ids from src/FieldUxContract.stories.tsx.
const externalHelpId = 'field-ux-external-help'
const standaloneControls = ['ux-text', 'ux-number', 'ux-area', 'ux-select']
const rhfControls = ['ux-text', 'ux-number', 'ux-select', 'ux-multi']
const storiesUnderTest: Array<[string, string[]]> = [
  [standaloneStory, standaloneControls],
  [rhfStory, rhfControls],
]
const viewports: Array<[number, number]> = [
  [1280, 720],
  [390, 844],
]

const control = (story: Locator, testId: string) =>
  story.locator(`[data-test="${testId}"]`)

// Attribute selector so generated ids with `:` or `«»` stay addressable.
const byId = (id: string) =>
  `[id="${id.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`

const tokensOf = (value: string | null) =>
  (value ?? '').split(/\s+/).filter(Boolean)

const idsFor = (inputId: string) => ({
  descriptionId: `${inputId}-description`,
  errorId: `${inputId}-error`,
})

async function inputIdOf(field: Locator): Promise<string> {
  const id = (await field.getAttribute('id')) ?? ''
  expect(id, 'control renders a derived id').not.toBe('')
  return id
}

async function expectNoHorizontalOverflow(
  page: Page,
  form: Locator,
  label: string
) {
  const viewportOverflow = await page.evaluate(() => {
    const root = document.documentElement
    return root.scrollWidth - root.clientWidth
  })
  expect(
    viewportOverflow,
    `${label}: document has no horizontal overflow`
  ).toBeLessThanOrEqual(1)

  const fixtureOverflow = await form.evaluate(
    (element) => element.scrollWidth - element.clientWidth
  )
  expect(
    fixtureOverflow,
    `${label}: fixture has no horizontal overflow`
  ).toBeLessThanOrEqual(1)
}

async function seriousOrCriticalViolations(page: Page) {
  await settle(page)
  const { violations } = await new AxeBuilder({ page })
    .exclude(TOOLBAR_SELECTOR)
    .analyze()
  return violations
    .filter(({ impact }) => impact === 'serious' || impact === 'critical')
    .map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    }))
}

test.describe('field UX contract', () => {
  for (const theme of themes) {
    test(`${theme} standalone controls merge caller help into unique resolvable references`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Toggle validation' }).click()

      const generatedIds = new Set<string>()
      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const inputId = await inputIdOf(field)
        const { descriptionId, errorId } = idsFor(inputId)

        const tokens = tokensOf(await field.getAttribute('aria-describedby'))
        expect(
          tokens,
          `${testId} keeps caller help ahead of the generated references`
        ).toEqual([externalHelpId, descriptionId, errorId])
        expect(
          tokens.filter((token) => token === externalHelpId),
          `${testId} deduplicates the repeated caller help token`
        ).toHaveLength(1)

        await expect(
          story.locator(byId(descriptionId)),
          `${testId} description node exists`
        ).toHaveCount(1)
        await expect(
          story.locator(byId(errorId)),
          `${testId} error node exists`
        ).toHaveCount(1)
        await expect(
          story.locator(byId(externalHelpId)),
          'caller help node exists'
        ).toHaveCount(1)

        for (const id of [inputId, descriptionId, errorId]) {
          expect(generatedIds.has(id), `${id} is a distinct node id`).toBe(
            false
          )
          generatedIds.add(id)
        }
      }
    })

    test(`${theme} standalone tooltip error renders one screen-reader alert before the inline alert takes over`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Toggle validation' }).click()

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { errorId } = idsFor(await inputIdOf(field))
        const alert = story.locator(byId(errorId))
        await expect(
          alert,
          `${testId} renders exactly one alert node in tooltip mode`
        ).toHaveCount(1)
        await expect(alert).toHaveRole('alert')
        await expect(
          alert,
          `${testId} keeps the tooltip alert screen-reader-only`
        ).toHaveClass(/sr-only/)
        expect((await alert.textContent())?.trim().length).toBeGreaterThan(0)
      }
      await expect(
        story.getByRole('alert'),
        'one alert per control in tooltip mode'
      ).toHaveCount(standaloneControls.length)

      await story.getByRole('button', { name: 'Toggle inline errors' }).click()

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { errorId } = idsFor(await inputIdOf(field))
        const alert = story.locator(byId(errorId))
        await expect(
          alert,
          `${testId} swaps to exactly one inline alert node`
        ).toHaveCount(1)
        await expect(alert).toHaveRole('alert')
        await expect(
          alert,
          `${testId} inline alert is no longer screen-reader-only`
        ).not.toHaveClass(/sr-only/)
        await expect(alert).toBeVisible()
        expect((await alert.textContent())?.trim().length).toBeGreaterThan(0)
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} keeps referencing the alert after the swap`
        ).toContain(errorId)
      }
      await expect(
        story.getByRole('alert'),
        'one alert per control in inline mode'
      ).toHaveCount(standaloneControls.length)
    })

    test(`${theme} standalone hidden errors keep aria-invalid and drop only the error reference`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Toggle validation' }).click()
      for (const testId of standaloneControls) {
        await expect(
          control(story, testId),
          `${testId} starts invalid`
        ).toHaveAttribute('aria-invalid', 'true')
      }

      await story.getByRole('button', { name: 'Toggle hidden errors' }).click()

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { descriptionId, errorId } = idsFor(await inputIdOf(field))
        await expect(
          field,
          `${testId} keeps aria-invalid while the error is hidden`
        ).toHaveAttribute('aria-invalid', 'true')
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} keeps help and description while dropping the error`
        ).toEqual([externalHelpId, descriptionId])
        await expect(
          story.locator(byId(errorId)),
          `${testId} unmounts the hidden alert`
        ).toHaveCount(0)
        await expect(
          story.locator(byId(descriptionId)),
          `${testId} keeps the description node`
        ).toHaveCount(1)
      }
      await expect(story.getByRole('alert')).toHaveCount(0)
    })

    test(`${theme} standalone description toggle drops the generated help reference and keeps caller help`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { descriptionId } = idsFor(await inputIdOf(field))
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} starts with the generated description reference`
        ).toEqual([externalHelpId, descriptionId])
      }

      await story.getByRole('button', { name: 'Toggle descriptions' }).click()

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { descriptionId } = idsFor(await inputIdOf(field))
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} drops the generated description reference`
        ).toEqual([externalHelpId])
        await expect(
          story.locator(byId(descriptionId)),
          `${testId} unmounts the description node`
        ).toHaveCount(0)
        await expect(
          story.locator(byId(externalHelpId)),
          'caller help stays rendered and referenced'
        ).toHaveCount(1)
      }
    })

    test(`${theme} standalone clearing validation removes the alert and its reference`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)
      const toggle = story.getByRole('button', { name: 'Toggle validation' })

      await toggle.click()
      await expect(
        story.getByRole('alert'),
        'validation renders one alert per control'
      ).toHaveCount(standaloneControls.length)

      await toggle.click()

      for (const testId of standaloneControls) {
        const field = control(story, testId)
        const { descriptionId, errorId } = idsFor(await inputIdOf(field))
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} releases the error reference`
        ).toEqual([externalHelpId, descriptionId])
        await expect(
          field,
          `${testId} no longer reports invalid`
        ).not.toHaveAttribute('aria-invalid', 'true')
        await expect(
          story.locator(byId(errorId)),
          `${testId} unmounts the alert`
        ).toHaveCount(0)
      }
      await expect(story.getByRole('alert')).toHaveCount(0)
    })

    test(`${theme} standalone select opens and navigates from the keyboard, Escape refocuses the trigger`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)
      const trigger = control(story, 'ux-select')

      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      await page.keyboard.press('ArrowDown')
      const highlighted = page.locator('[role="option"][data-highlighted]')
      await expect(
        highlighted,
        'arrow navigation highlights an option'
      ).toHaveCount(1)
      const highlightedLabel = ((await highlighted.textContent()) ?? '').trim()
      expect(highlightedLabel, 'options expose their label').not.toBe('')
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(
        trigger,
        'arrow navigation commits the highlighted option'
      ).toContainText(highlightedLabel)

      await expect(trigger).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await page.keyboard.press('Escape')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger, 'Escape returns focus to the trigger').toBeFocused()
    })

    test(`${theme} fixture reflows without horizontal overflow at desktop and 390px`, async ({
      page,
    }) => {
      for (const [storyId, testIds] of storiesUnderTest) {
        await gotoStory(page, storyId, theme)
        const form = page.locator('form').first()
        await expect(form).toBeVisible()

        for (const [width, height] of viewports) {
          await page.setViewportSize({ width, height })
          await expectNoHorizontalOverflow(
            page,
            form,
            `${storyId} at ${width}px`
          )
          for (const testId of testIds) {
            await expect(
              page.locator(`[data-test="${testId}"]`),
              `${testId} stays inside the viewport at ${width}px`
            ).toBeInViewport()
          }
        }
      }
    })

    test(`${theme} RHF wrappers merge external help and show one visible error each after submit`, async ({
      page,
    }) => {
      await gotoStory(page, rhfStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Validate fields' }).click()

      const generatedIds = new Set<string>()
      for (const testId of rhfControls) {
        const field = control(story, testId)
        const inputId = await inputIdOf(field)
        const { descriptionId, errorId } = idsFor(inputId)

        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} merges caller help, description, and error references`
        ).toEqual([externalHelpId, descriptionId, errorId])

        const description = story.locator(byId(descriptionId))
        await expect(
          description,
          `${testId} description node exists`
        ).toHaveCount(1)
        expect(
          await description.evaluate((element) => element.tagName),
          `${testId} renders the rich description as a block container`
        ).toBe('DIV')

        const alert = story.locator(byId(errorId))
        await expect(
          alert,
          `${testId} shows exactly one visible error alert`
        ).toHaveCount(1)
        await expect(alert).toHaveRole('alert')
        await expect(alert).toBeVisible()
        expect((await alert.textContent())?.trim().length).toBeGreaterThan(0)

        for (const id of [inputId, descriptionId, errorId]) {
          expect(generatedIds.has(id), `${id} is a distinct node id`).toBe(
            false
          )
          generatedIds.add(id)
        }
      }
      await expect(
        story.getByRole('alert'),
        'one visible error per RHF wrapper'
      ).toHaveCount(rhfControls.length)
    })

    test(`${theme} RHF hidden errors keep aria-invalid and drop only the error reference`, async ({
      page,
    }) => {
      await gotoStory(page, rhfStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Validate fields' }).click()
      for (const testId of rhfControls) {
        await expect(
          control(story, testId),
          `${testId} starts invalid`
        ).toHaveAttribute('aria-invalid', 'true')
      }

      await story.getByRole('button', { name: 'Toggle hidden errors' }).click()

      for (const testId of rhfControls) {
        const field = control(story, testId)
        const { descriptionId, errorId } = idsFor(await inputIdOf(field))
        await expect(
          field,
          `${testId} keeps aria-invalid while the error is hidden`
        ).toHaveAttribute('aria-invalid', 'true')
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} keeps help and description while dropping the error`
        ).toEqual([externalHelpId, descriptionId])
        await expect(
          story.locator(byId(errorId)),
          `${testId} unmounts the hidden alert`
        ).toHaveCount(0)
      }
      await expect(story.getByRole('alert')).toHaveCount(0)
    })

    test(`${theme} RHF clearing validation removes every alert and error reference`, async ({
      page,
    }) => {
      await gotoStory(page, rhfStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Validate fields' }).click()
      await expect(
        story.getByRole('alert'),
        'submit renders one alert per wrapper'
      ).toHaveCount(rhfControls.length)

      await story.getByRole('button', { name: 'Clear validation' }).click()

      for (const testId of rhfControls) {
        const field = control(story, testId)
        const { descriptionId, errorId } = idsFor(await inputIdOf(field))
        expect(
          tokensOf(await field.getAttribute('aria-describedby')),
          `${testId} releases the error reference`
        ).toEqual([externalHelpId, descriptionId])
        await expect(
          field,
          `${testId} no longer reports invalid`
        ).not.toHaveAttribute('aria-invalid', 'true')
        await expect(
          story.locator(byId(errorId)),
          `${testId} unmounts the alert`
        ).toHaveCount(0)
      }
      await expect(story.getByRole('alert')).toHaveCount(0)
    })

    test(`${theme} axe finds no serious or critical violations in default, invalid inline, and open states`, async ({
      page,
    }) => {
      await gotoStory(page, standaloneStory, theme)
      const story = page.locator(STORY_SELECTOR)

      expect(
        await seriousOrCriticalViolations(page),
        `${theme} standalone, default tooltip state`
      ).toEqual([])

      await story.getByRole('button', { name: 'Toggle validation' }).click()
      await story.getByRole('button', { name: 'Toggle inline errors' }).click()
      expect(
        await seriousOrCriticalViolations(page),
        `${theme} standalone, invalid inline state`
      ).toEqual([])

      await control(story, 'ux-select').click()
      await expect(page.getByRole('listbox')).toBeVisible()
      await expect(page.getByRole('option').first()).toBeFocused()
      expect(
        await seriousOrCriticalViolations(page),
        `${theme} standalone, open state`
      ).toEqual([])
    })

    test(`${theme} axe finds no serious or critical violations for the invalid RHF state`, async ({
      page,
    }) => {
      await gotoStory(page, rhfStory, theme)
      const story = page.locator(STORY_SELECTOR)
      await story.getByRole('button', { name: 'Validate fields' }).click()
      await expect(story.getByRole('alert')).toHaveCount(rhfControls.length)

      expect(
        await seriousOrCriticalViolations(page),
        `${theme} RHF, invalid state`
      ).toEqual([])
    })
  }
})
