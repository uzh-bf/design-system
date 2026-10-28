import type { ReactNode } from 'react'

export const PublishedIcon = () => (
  <span aria-hidden="true" className="font-mono font-bold">
    P
  </span>
)

export const ChartFrame = ({
  title,
  summary,
  testId,
  children,
}: {
  title: string
  summary: string
  testId: string
  children: ReactNode
}) => (
  <figure
    className="bg-background text-foreground border-border m-0 flex min-w-0 flex-col gap-5 rounded-xl border p-6 pt-16 sm:p-8 sm:pt-16"
    data-test={`${testId}-frame`}
  >
    <figcaption className="flex max-w-3xl flex-col gap-1">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm">{summary}</p>
    </figcaption>
    <div className="w-full max-w-3xl">{children}</div>
  </figure>
)
