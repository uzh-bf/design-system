import { cn } from '@/lib/utils'
import { StoryDefault } from '@ladle/react'
import { Slider } from './slider'

type SliderProps = React.ComponentProps<typeof Slider>

export default {
  title: 'Shadcn/Slider',
} satisfies StoryDefault

export function Default({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn('w-[60%]', className)}
      {...props}
    />
  )
}
