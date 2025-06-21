import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { ShadcnLabel } from './ShadcnLabel'

export const Default = () => {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <ShadcnLabel htmlFor="r1">Default</ShadcnLabel>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <ShadcnLabel htmlFor="r2">Comfortable</ShadcnLabel>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <ShadcnLabel htmlFor="r3">Compact</ShadcnLabel>
      </div>
    </RadioGroup>
  )
}
