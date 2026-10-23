import { PublishedIcon } from './ChartFrame'

export const trendData = [
  { month: 'January', published: 24, draft: 8 },
  { month: 'February', published: 32, draft: null },
  { month: 'March', published: 18, draft: 14 },
  { month: 'April', published: 0, draft: 6 },
]

export const shareData = [
  { segment: 'published', value: 62 },
  { segment: 'draft', value: 26 },
  { segment: 'baseline', value: 0 },
  { segment: 'missing', value: null },
]

export const radarData = [
  { area: 'Discover', published: 80, draft: 42 },
  { area: 'Read', published: 62, draft: 34 },
  { area: 'Compare', published: 74, draft: 28 },
  { area: 'Decide', published: 55, draft: 18 },
]

export const radialData = [
  { segment: 'published', value: 72 },
  { segment: 'draft', value: 48 },
  { segment: 'baseline', value: 20 },
]

export const tooltipData = [
  { month: 'January', published: 0, draft: null },
  { month: 'February', published: 12, draft: 4 },
  { month: 'March', published: 18, draft: 9 },
]

const plotColors = {
  published: 'color-mix(in oklab, var(--chart-1), var(--foreground) 25%)',
  draft: 'color-mix(in oklab, var(--chart-5), var(--foreground) 25%)',
  baseline: 'color-mix(in oklab, var(--chart-2), var(--foreground) 25%)',
  missing: 'color-mix(in oklab, var(--chart-3), var(--foreground) 25%)',
}

export const trendConfig = {
  published: {
    label: 'Published',
    color: plotColors.published,
    icon: PublishedIcon,
  },
  draft: { label: 'Draft', color: plotColors.draft },
}

export const shareConfig = {
  published: { label: 'Published', color: plotColors.published },
  draft: { label: 'Draft', color: plotColors.draft },
  baseline: { label: 'Baseline', color: plotColors.baseline },
  missing: { label: 'Missing', color: plotColors.missing },
}

export const radialConfig = {
  published: { label: 'Published', color: plotColors.published },
  draft: { label: 'Draft', color: plotColors.draft },
  baseline: { label: 'Baseline', color: plotColors.baseline },
}
