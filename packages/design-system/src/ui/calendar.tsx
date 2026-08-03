'use client'

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import * as React from 'react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '../lib/utils'
import { Button, buttonVariants } from './button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  data,
  dataPreviousMonth,
  dataNextMonth,
  'data-cy': dataCyAttribute,
  'data-test': dataTestAttribute,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  data?: { cy?: string; test?: string }
  dataPreviousMonth?: { cy?: string; test?: string }
  dataNextMonth?: { cy?: string; test?: string }
  'data-cy'?: string
  'data-test'?: string
}) {
  const defaultClassNames = getDefaultClassNames()

  // Calendar accepts both the `data` prop and raw data-cy/data-test
  // attributes, because the pickers forward their `dataCalendar` as raw
  // attributes. A raw attribute wins, but only when it carries a value: the
  // pickers always pass the key, so plain JSX spread precedence would let an
  // unset dataCalendar blank a `data` prop that a direct caller had set.
  return (
    <DayPicker
      data-cy={dataCyAttribute ?? data?.cy}
      data-test={dataTestAttribute ?? data?.test}
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar border-border bg-background text-foreground w-fit min-w-[280px] rounded-lg border p-4 shadow-lg [--cell-size:34px] in-data-[slot=card-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      startMonth={new Date(new Date().getFullYear() - 1, 0)}
      endMonth={new Date(new Date().getFullYear() + 99, 0)}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-3', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-7 rounded-md border border-border p-0 text-muted-foreground shadow-none select-none hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-7 rounded-md border border-border p-0 text-muted-foreground shadow-none select-none hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-7 w-full items-center justify-center px-8',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-7 w-full items-center justify-center gap-1.5 text-sm font-semibold',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md border border-border shadow-none has-focus:border-primary has-focus:ring-[3px] has-focus:ring-primary/20',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-semibold text-foreground',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex h-7 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('mb-1 flex gap-0.5', defaultClassNames.weekdays),
        weekday: cn(
          'h-6 flex-1 select-none rounded-md text-center text-xs leading-6 font-normal text-muted-foreground',
          defaultClassNames.weekday
        ),
        week: cn('mt-0 flex w-full gap-0.5', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'select-none text-xs text-muted-foreground',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-(--cell-size) w-(--cell-size) p-0 text-center select-none [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day
        ),
        range_start: cn(
          'rounded-l-md bg-primary/20',
          defaultClassNames.range_start
        ),
        range_middle: cn(
          'rounded-none bg-primary/20',
          defaultClassNames.range_middle
        ),
        range_end: cn(
          'rounded-r-md bg-primary/20',
          defaultClassNames.range_end
        ),
        today: cn(
          'rounded-md border border-primary bg-transparent text-primary data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-muted-foreground opacity-70',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef as React.Ref<HTMLDivElement>}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn('size-4', className)}
                {...props}
                data-cy={dataPreviousMonth?.cy}
                data-test={dataPreviousMonth?.test}
              />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
                data-cy={dataNextMonth?.cy}
                data-test={dataNextMonth?.test}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[range-end=true]:bg-primary data-[range-middle=true]:bg-primary/20 data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary group-data-[focused=true]/day:ring-primary/20 text-foreground hover:bg-accent hover:text-accent-foreground data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground flex aspect-square size-(--cell-size) min-w-(--cell-size) flex-col gap-1 rounded-md text-[13px] leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[selected-single=true]:font-semibold [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
