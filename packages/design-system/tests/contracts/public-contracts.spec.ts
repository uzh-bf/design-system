import { expect, test } from '@playwright/test'

import { gotoStory } from '../_support/ladle'

test('composite native attributes reach their root elements', async ({
  page,
}) => {
  await gotoStory(page, 'public-contracts--default')

  const button = page.getByRole('button', {
    name: 'Contract button accessible name',
  })
  await expect(button).toHaveAttribute('data-cy', 'contract-button')
  await expect(button).toHaveAttribute(
    'aria-label',
    'Contract button accessible name'
  )

  const navigation = page.getByRole('menubar')
  await expect(navigation).toHaveAttribute('aria-label', 'Contract navigation')
  await expect(navigation).toHaveAttribute('title', 'Contract navigation')

  const progress = page.getByRole('progressbar')
  await expect(progress).toHaveAttribute('data-cy', 'contract-progress')
  await expect(progress).toHaveAttribute('aria-label', 'Contract progress')
})
