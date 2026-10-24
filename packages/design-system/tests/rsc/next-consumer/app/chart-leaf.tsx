'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@uzh-bf/design-system'
import { Line, LineChart, XAxis } from 'recharts'

const data = [
  { period: 'first', value: 0 },
  { period: 'second', value: 12 },
]
const config = { value: { label: 'Responses', color: 'var(--chart-1)' } }

export function ChartLeaf() {
  return (
    <section aria-label="Packed chart composition">
      <ChartContainer
        data-testid="packed-chart"
        config={config}
        className="min-h-48 w-full max-w-xl"
        initialDimension={{ width: 400, height: 240 }}
      >
        <LineChart data={data}>
          <XAxis dataKey="period" />
          <Line
            dataKey="value"
            stroke="var(--color-value)"
            isAnimationActive={false}
          />
          <ChartTooltip defaultIndex={0} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
      <p>First period: 0 responses; second period: 12 responses.</p>
    </section>
  )
}
