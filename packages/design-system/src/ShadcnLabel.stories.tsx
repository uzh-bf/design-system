import { ShadcnLabel } from './ShadcnLabel'
import { Checkbox } from './ui/checkbox'

export const Default = () => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <ShadcnLabel htmlFor="terms">Accept terms and conditions</ShadcnLabel>
      </div>
    </div>
  )
}
