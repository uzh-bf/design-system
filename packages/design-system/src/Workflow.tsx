'use client'

import {
  faCheck,
  faExclamationCircle,
  faPencil,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
import { Tooltip } from './Tooltip'

interface StepBaseProps {
  title: string
  description?: string
  tooltip?: string
  tooltipDisabled?: string
  progress?: number
  completed?: boolean
  error?: boolean
  [x: string]: unknown
}

interface StepProps extends StepBaseProps {
  progress?: never
  completed?: never
  error?: never
}

interface StepProgressProps extends StepBaseProps {
  progress?: number
  completed?: boolean
  error?: boolean
}

interface WorkflowBaseProps {
  activeIx?: number
  twStyles?: {
    bgHover: string
    bgActive: string
    bgPast: string
  }
  minimal?: boolean
  disabledFrom?: number
  showTooltipSymbols?: boolean
  className?: {
    root?: string
    item?: string
    active?: string
    past?: string
    title?: string
    description?: string
  }
}

export interface WorkflowProps extends WorkflowBaseProps {
  activeIx: number
  items: StepProps[]
  onClick: (item: StepProps | StepProgressProps, ix: number) => void
}

export interface WorkflowProgressProps extends WorkflowBaseProps {
  activeIx?: number
  items: StepProgressProps[]
  onClick: (item: StepProps | StepProgressProps, ix: number) => void
}

/**
 * This function returns a pre-styled Workflow component. Theme-based styling is not available for this component at the moment, use the twStyles or className objects instead to override default styling.
 *
 * @param items - The array of steps that should be displayed in the workflow.
 * @param onClick - The function that is called when a step is clicked. The step object is passed as an argument.
 * @param activeIx - The index of the active step. State management is not handled by this component.
 * @param twStyles - The optional twStyles object allows you to override the default styling.
 * @param minimal - The optional minimal boolean allows you to render the workflow with minimal space requirements.
 * @param disabledFrom - The optional disabledFrom number allows you to disable steps from a certain index onwards.
 * @param showTooltipSymbols - The optional showTooltipSymbols boolean allows you to show the tooltip symbols.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Workflow component
 */
export function Workflow({
  items,
  onClick,
  activeIx,
  twStyles = {
    bgHover: 'hover:bg-primary-20 hover:after:border-l-primary-20!',
    bgActive: 'bg-primary-100 after:border-l-primary-100',
    bgPast: 'bg-primary-20 after:border-l-primary-20',
  },
  minimal = false,
  disabledFrom,
  showTooltipSymbols,
  className,
}: WorkflowProps | WorkflowProgressProps) {
  const hasDescription = (items as StepBaseProps[]).reduce(
    (acc, item) => acc || Boolean(item.description),
    false
  )

  return (
    <ol
      className={twMerge(
        'flex w-full flex-row',
        hasDescription ? 'h-[50px]' : minimal ? 'h-[26px]' : 'h-[34px]',
        className?.root
      )}
    >
      {items.map((item, ix) => {
        const disabled = ix > (disabledFrom || items.length) - 1

        if (typeof activeIx !== 'undefined') {
          return (
            <WorkflowItem
              key={`${item.title}-${ix}`}
              item={item as StepProps}
              ix={ix}
              hasDescription={hasDescription}
              minimal={minimal}
              activeIx={activeIx}
              disabled={disabled}
              tooltip={disabled ? item.tooltipDisabled : item.tooltip}
              showTooltipSymbols={showTooltipSymbols}
              onClick={onClick}
              numItems={items.length}
              twStyles={twStyles}
              className={className}
            />
          )
        }

        return (
          <WorkflowItem
            key={`${item.title}-${item.progress}-${item.completed}-${ix}`}
            item={item as StepProgressProps}
            ix={ix}
            hasDescription={hasDescription}
            minimal={minimal}
            disabled={disabled}
            tooltip={disabled ? item.tooltipDisabled : item.tooltip}
            showTooltipSymbols={showTooltipSymbols}
            onClick={onClick}
            numItems={items.length}
            twStyles={twStyles}
            className={className}
          />
        )
      })}
    </ol>
  )
}

interface WorkflowItemProps {
  item: StepProps | StepProgressProps
  onClick: (item: StepProps | StepProgressProps, ix: number) => void
  ix: number
  hasDescription: boolean
  minimal: boolean
  activeIx?: number
  disabled: boolean
  tooltip?: string
  showTooltipSymbols?: boolean
  numItems: number
  twStyles: {
    bgHover: string
    bgActive: string
    bgPast: string
  }
  className?: {
    root?: string
    item?: string
    active?: string
    past?: string
    title?: string
    description?: string
  }
}

/**
 * A single workflow step. It renders an `<li>` and must therefore be placed
 * inside an `<ol>`/`<ul>`; an orphaned list item is invalid HTML and loses its
 * implicit `listitem` role. Prefer rendering `Workflow`, which owns the list.
 */
export function WorkflowItem({
  item,
  ix,
  hasDescription,
  minimal,
  activeIx,
  disabled,
  tooltip,
  showTooltipSymbols,
  onClick,
  numItems,
  twStyles,
  className,
}: WorkflowItemProps) {
  // Completed, failed and in-progress steps are marked by a decorative icon and
  // a background colour, both of which FontAwesome renders `aria-hidden`. The
  // step keeps its accessible name either way — the title is always visible —
  // but without this the state itself never reaches a screen reader (1.3.1).
  // Same visually-hidden-text pattern StepProgress uses, and English is
  // hardcoded for the same reason (decision DE).
  const statusLabel = item.error
    ? 'error'
    : item.completed || item.progress === 1
      ? 'completed'
      : item.progress && item.progress < 1
        ? 'in progress'
        : null

  const content = (
    <div className="flex w-full flex-col">
      <div
        className={twMerge(
          'leading-5',
          (ix === activeIx ||
            (typeof item.progress !== 'undefined' &&
              0 < item.progress &&
              item.progress < 1)) &&
            'font-bold',
          className?.title
        )}
      >
        {item.title}
      </div>
      {statusLabel && <span className="sr-only">{statusLabel}</span>}
      {/* // TODO: introduce line-clamp-1 here once support is sufficient */}
      <div className={twMerge('text-sm', className?.description)}>
        {item.description}
      </div>
    </div>
  )

  // The step is a real button so it is reachable and operable by keyboard. The
  // arrow-shaped pseudo-elements and the progress gradient stay on the list
  // item, while the padding that offsets the incoming arrow moves onto the
  // button so the whole cell remains clickable. `first:`/`last:` cannot express
  // that from inside the item, hence the explicit edge check.
  const isEdgeItem = ix === 0 || ix === numItems - 1
  const buttonClassName = twMerge(
    'focus-visible:ring-ring flex h-full w-full cursor-pointer items-center justify-center gap-2 select-none focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset',
    hasDescription ? 'pl-[25px]' : minimal ? 'pl-[13px]' : 'pl-[17px]',
    isEdgeItem && 'pl-0',
    disabled && 'cursor-not-allowed'
  )
  const buttonProps = {
    type: 'button',
    onClick: () => (disabled ? null : onClick(item, ix)),
    'aria-current': ix === activeIx ? 'step' : undefined,
    // aria-disabled, not the native attribute: a disabled step must stay
    // focusable so keyboard users can still read its `tooltipDisabled`
    // explanation. The runtime guard above already blocks the action.
    'aria-disabled': disabled || undefined,
  } as const

  return (
    <li
      className={twMerge(
        'group bg-muted relative flex items-center justify-center text-center',
        'mr-1 first:before:border-none! last:mr-0 last:after:border-none!',
        'after:z-10 after:border after:border-r-0 after:border-solid after:border-y-transparent',
        "before:absolute before:right-auto before:left-0 before:z-0 before:content-['']",
        'before:border before:border-r-0 before:border-solid before:border-y-transparent',
        "after:border-l-muted before:border-l-white after:absolute after:content-['']",
        twStyles.bgHover,
        hasDescription
          ? 'h-[50px] before:border-y-25 before:border-l-25 after:right-[-25px] after:border-y-25 after:border-l-25'
          : minimal
            ? 'h-[26px] before:border-y-13 before:border-l-13 after:right-[-13px] after:border-y-13 after:border-l-13'
            : 'h-[34px] before:border-y-17 before:border-l-17 after:right-[-17px] after:border-y-17 after:border-l-17',
        ix < (activeIx || -1) &&
          twMerge(twStyles.bgPast, 'text-primary-100', className?.past),
        ix === activeIx &&
          twMerge(twStyles.bgActive, 'text-white', className?.active),
        (item.completed || item.progress === 1) &&
          (ix === activeIx
            ? 'bg-success text-success-foreground after:border-l-success hover:bg-success hover:after:border-l-success!'
            : 'bg-success-background text-success-foreground dark:text-success after:border-l-success-background hover:bg-success-background hover:after:border-l-success-background!'),
        item.error &&
          (ix === activeIx
            ? 'bg-destructive text-destructive-foreground after:border-l-destructive hover:bg-destructive hover:after:border-l-destructive!'
            : 'bg-destructive-background text-destructive-text after:border-l-destructive-background hover:bg-destructive-background hover:after:border-l-destructive-background!'),
        !item.completed &&
          item.progress !== 1 &&
          item.progress &&
          'hover:after:border-l-muted! hover:bg-none',
        disabled && 'hover:bg-muted hover:after:border-l-muted! text-gray-500',
        className?.item
      )}
      style={{
        width: `${100 / numItems}%`,
        background:
          !item.error && !item.completed && item.progress !== 1 && item.progress
            ? `linear-gradient(to right, rgb(74 222 128) 0%, rgb(74 222 128) ${
                item.progress * 100
              }%, var(--color-muted) ${
                item.progress * 100
              }%, var(--color-muted) 100%)`
            : '',
      }}
    >
      {typeof tooltip !== 'undefined' ? (
        <Tooltip
          tooltip={tooltip}
          delay={1500}
          asChild
          className={{
            tooltip: 'z-20 max-w-120',
          }}
        >
          <button
            {...buttonProps}
            className={twMerge(
              buttonClassName,
              showTooltipSymbols && 'justify-between'
            )}
          >
            {showTooltipSymbols &&
              (item.error ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-destructive ml-2"
                />
              ) : (
                <div className="ml-2 w-3" />
              ))}
            <div className="flex flex-row items-center gap-2">
              {!item.error && (item.completed || item.progress === 1) && (
                <FontAwesomeIcon className="mt-0.5" icon={faCheck} />
              )}
              {!item.error &&
              !item.completed &&
              item.progress &&
              item.progress < 1 ? (
                <FontAwesomeIcon className="mt-0.5" icon={faPencil} />
              ) : null}
              <div className="mt-0.5">{content}</div>
            </div>
            {showTooltipSymbols && (
              <FontAwesomeIcon
                icon={faQuestion}
                className={twMerge(
                  'my-auto mr-2 h-3! w-3! rounded-full border border-solid border-white px-0.5 py-0.5 group-hover:border-black',
                  ix !== activeIx && 'border-black',
                  (ix < (activeIx || -1) || disabled) &&
                    'border-gray-500 group-hover:border-gray-500'
                )}
              />
            )}
          </button>
        </Tooltip>
      ) : (
        <button
          {...buttonProps}
          className={twMerge(buttonClassName, item.error && 'justify-between')}
        >
          {item.error && (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-destructive ml-2"
            />
          )}
          {!item.error && (item.completed || item.progress === 1) && (
            <FontAwesomeIcon className="mt-0.5" icon={faCheck} />
          )}
          {!item.error &&
          !item.completed &&
          item.progress &&
          item.progress < 1 ? (
            <FontAwesomeIcon className="mt-0.5" icon={faPencil} />
          ) : null}
          <div className="mt-0.5">{content}</div>
          {item.error && <div className="w-3" />}
        </button>
      )}
    </li>
  )
}

export default Workflow
