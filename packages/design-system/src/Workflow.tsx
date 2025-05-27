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
    bgHover: 'hover:bg-uzh-blue-20 hover:after:!border-l-uzh-blue-20',
    bgActive: 'bg-uzh-blue-80 after:border-l-uzh-blue-80',
    bgPast: 'bg-uzh-blue-20 after:border-l-uzh-blue-20',
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
    <div
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
    </div>
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
      {/* // TODO: introduce line-clamp-1 here once support is sufficient */}
      <div className={twMerge('text-sm', className?.description)}>
        {item.description}
      </div>
    </div>
  )

  return (
    <div
      className={twMerge(
        'bg-uzh-grey-40 group relative flex items-center justify-center text-center',
        'mr-1 cursor-pointer select-none first:before:!border-none last:mr-0 after:last:!border-none',
        'after:z-10 after:border after:border-r-0 after:border-solid after:border-y-transparent',
        "before:absolute before:left-0 before:right-auto before:z-0 before:content-['']",
        'before:border before:border-r-0 before:border-solid before:border-y-transparent',
        "after:border-l-uzh-grey-40 before:border-l-white after:absolute after:content-['']",
        twStyles.bgHover,
        hasDescription
          ? 'h-[50px] pl-[25px] before:border-y-[25px] before:border-l-[25px] after:right-[-25px] after:border-y-[25px] after:border-l-[25px] first:pl-0 last:pl-0'
          : minimal
            ? 'h-[26px] pl-[13px] before:border-y-[13px] before:border-l-[13px] after:right-[-13px] after:border-y-[13px] after:border-l-[13px] first:pl-0 last:pl-0'
            : 'h-[34px] pl-[17px] before:border-y-[17px] before:border-l-[17px] after:right-[-17px] after:border-y-[17px] after:border-l-[17px] first:pl-0 last:pl-0',
        ix < (activeIx || -1) &&
          twMerge(twStyles.bgPast, 'text-gray-500', className?.past),
        ix === activeIx &&
          twMerge(
            twStyles.bgActive,
            'text-white hover:text-black',
            className?.active
          ),
        (item.completed || item.progress === 1) &&
          (ix === activeIx
            ? 'bg-green-600 after:border-l-green-600 hover:bg-green-200 hover:after:!border-l-green-200'
            : 'bg-green-200 after:border-l-green-200 hover:bg-green-200 hover:after:!border-l-green-200'),
        item.error &&
          (ix === activeIx
            ? 'bg-red-600 after:border-l-red-600 hover:bg-red-200 hover:after:!border-l-red-200'
            : 'bg-red-200 after:border-l-red-200 hover:bg-red-200 hover:after:!border-l-red-200'),
        !item.completed &&
          item.progress !== 1 &&
          item.progress &&
          'hover:after:!border-l-uzh-grey-40 hover:bg-none',
        disabled &&
          'hover:bg-uzh-grey-40 hover:after:!border-l-uzh-grey-40 cursor-not-allowed text-gray-500',
        className?.item
      )}
      onClick={() => (disabled ? null : onClick(item, ix))}
      style={{
        width: `${100 / numItems}%`,
        background:
          !item.error && !item.completed && item.progress !== 1 && item.progress
            ? `linear-gradient(to right, rgb(74 222 128) 0%, rgb(74 222 128) ${
                item.progress * 100
              }%, rgb(218 222 226) ${
                item.progress * 100
              }%, rgb(218 222 226) 100%)`
            : '',
      }}
    >
      {typeof tooltip !== 'undefined' ? (
        <Tooltip
          tooltip={tooltip}
          delay={1500}
          className={{
            tooltip: 'z-20 max-w-[30rem]',
            trigger: '!w-full',
          }}
        >
          <div
            className={twMerge(
              'flex flex-row items-center justify-center gap-2',
              showTooltipSymbols && 'justify-between'
            )}
          >
            {showTooltipSymbols &&
              (item.error ? (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="ml-2 text-red-600"
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
                size="lg"
                className={twMerge(
                  'my-auto mr-2 h-3 w-3 rounded-full border border-solid border-white px-0.5 py-0.5 group-hover:border-black',
                  ix !== activeIx && 'border-black',
                  (ix < (activeIx || -1) || disabled) &&
                    'border-gray-500 group-hover:border-gray-500'
                )}
              />
            )}
          </div>
        </Tooltip>
      ) : (
        <div
          className={twMerge(
            'flex flex-row items-center gap-2',
            item.error && 'ga-0 w-full justify-between'
          )}
        >
          {item.error && (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="ml-2 text-red-600"
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
        </div>
      )}
    </div>
  )
}

export default Workflow
