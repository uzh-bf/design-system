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
  dataPreviousMonth,
  dataNextMonth,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  dataPreviousMonth?: { cy?: string; test?: string }
  dataNextMonth?: { cy?: string; test?: string }
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar w-fit min-w-[280px] rounded-lg border border-[#E0E0E0] bg-white p-4 text-[#111111] shadow-lg [--cell-size:34px] in-data-[slot=card-content]:bg-transparent',
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
          'size-7 rounded-md border border-[#E0E0E0] p-0 text-[#666666] shadow-none select-none hover:bg-[#FAFAFA] hover:text-[#111111] aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-7 rounded-md border border-[#E0E0E0] p-0 text-[#666666] shadow-none select-none hover:bg-[#FAFAFA] hover:text-[#111111] aria-disabled:opacity-50',
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
          'relative rounded-md border border-[#E0E0E0] shadow-none has-focus:border-primary-100 has-focus:ring-[3px] has-focus:ring-primary-100/20',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-semibold text-[#111111]',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex h-7 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 [&>svg]:text-[#666666]',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('mb-1 flex gap-0.5', defaultClassNames.weekdays),
        weekday: cn(
          'h-6 flex-1 select-none rounded-md text-center text-xs leading-6 font-normal text-[#666666]',
          defaultClassNames.weekday
        ),
        week: cn('mt-0 flex w-full gap-0.5', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'select-none text-xs text-[#666666]',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative aspect-square h-(--cell-size) w-(--cell-size) p-0 text-center select-none [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day
        ),
        range_start: cn(
          'rounded-l-md bg-primary-20',
          defaultClassNames.range_start
        ),
        range_middle: cn(
          'rounded-none bg-primary-20',
          defaultClassNames.range_middle
        ),
        range_end: cn(
          'rounded-r-md bg-primary-20',
          defaultClassNames.range_end
        ),
        today: cn(
          'rounded-md border border-primary-100 bg-transparent text-primary-100 data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-[#A3A3A3] aria-selected:text-[#A3A3A3]',
          defaultClassNames.outside
        ),
        disabled: cn('text-[#A3A3A3] opacity-70', defaultClassNames.disabled),
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
        'data-[range-end=true]:bg-primary-100 data-[range-middle=true]:bg-primary-20 data-[range-start=true]:bg-primary-100 data-[selected-single=true]:bg-primary-100 group-data-[focused=true]/day:ring-primary-100/20 flex aspect-square size-(--cell-size) min-w-(--cell-size) flex-col gap-1 rounded-md text-[13px] leading-none font-normal text-[#111111] group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] hover:bg-[#FAFAFA] hover:text-[#111111] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:text-white data-[range-middle=true]:rounded-none data-[range-middle=true]:text-[#111111] data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:text-white data-[selected-single=true]:font-semibold data-[selected-single=true]:text-white [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
