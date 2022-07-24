import { twMerge } from 'tailwind-merge'

import Button from './Button'

export interface CardProps {
  backgroundSrc?: string
  className?: string
  disabled?: boolean
  tags?: string[]
  title?: string

  onClick?: () => void
}

const defaultProps = {
  disabled: false,
  tags: [],
}

export function Card({
  backgroundSrc,
  className,
  disabled,
  tags,
  title,
  onClick,
}: CardProps) {
  if (onClick) {
    return (
      <Button
        fluid
        disabled={disabled}
        onClick={onClick}
        className={twMerge(
          'p-0 border-none outline outline-1 outline-uzh-grey-60',
          className,
          disabled
            ? 'cursor-default hover:bg-inherit hover:text-inherit hover:border-inherit'
            : 'hover:shadow-lg hover:outline-uzh-red-100'
        )}
      >
        <div className={twMerge('w-full h-full relative', 'min-h-[200px]')}>
          {tags && tags.length > 0 && (
            <div className="absolute top-0 z-10 flex flex-row flex-wrap gap-1 p-2">
              {tags.map((tag) => (
                <div>{tag}</div>
              ))}
            </div>
          )}

          {title && (
            <div className="absolute left-0 right-0 z-10 py-1 text-lg font-bold text-center bg-white bg-opacity-70 bottom-3">
              {title}
            </div>
          )}

          <img
            className={twMerge(
              'z-0 w-full rounded opacity-80',
              'grayscale filter hover:filter-none'
            )}
            src={backgroundSrc}
            alt={`Image of ${title}`}
          />
        </div>
      </Button>
    )
  }

  return <div>hello</div>
}

Card.defaultProps = defaultProps

export default Card
