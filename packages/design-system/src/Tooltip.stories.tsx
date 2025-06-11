import Button from './Button'
import Tooltip from './Tooltip'

export const Default = () => {
  return (
    <Tooltip tooltip="Content Tooltip">
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Hover Me!
      </div>
    </Tooltip>
  )
}

export const MultiLine = () => {
  return (
    <Tooltip tooltip="Content Tooltip">
      Aliqua exercitation ullamco esse mollit. Sint quis ut ad quis laboris
      incididunt aliquip quis ipsum elit aliqua culpa elit. Velit dolore Lorem
      incididunt irure reprehenderit exercitation. Esse amet ipsum dolore mollit
      veniam. Exercitation ut in veniam consectetur pariatur magna reprehenderit
      consectetur mollit dolore. Veniam ex officia fugiat in proident aute ipsum
      veniam tempor labore. Culpa consequat id consequat aute enim occaecat sunt
      sunt. Aliquip ea deserunt incididunt do consectetur fugiat excepteur est
      et. Esse nisi ullamco tempor nulla Lorem duis mollit. Dolore dolor quis
      reprehenderit labore nulla tempor. Ipsum incididunt et et et. Do nisi
      ullamco fugiat enim fugiat consectetur consequat ad. Elit commodo officia
      aliqua aute pariatur eu quis qui cupidatat ex adipisicing. Aliqua tempor
      eu exercitation reprehenderit qui occaecat excepteur adipisicing
      incididunt aliqua magna. Qui dolore cupidatat officia veniam consectetur
      officia. Deserunt laboris consectetur sint mollit nulla exercitation
      exercitation enim irure. Sunt ex occaecat ut ea ea eu nisi. Non sunt dolor
      sit fugiat elit eu anim excepteur commodo exercitation. Id reprehenderit
      nulla tempor ea est dolor. Deserunt eu ea eiusmod laborum ut duis officia
      in nulla. Commodo elit elit occaecat eiusmod incididunt adipisicing
      adipisicing anim nisi labore fugiat ea. Occaecat ipsum cupidatat in
      occaecat. Amet ex ad irure nulla aliqua excepteur labore nulla ipsum
      labore aliquip amet tempor. Exercitation aliqua labore sit quis nisi ipsum
      id. Fugiat nostrud ea elit culpa aliquip esse amet non ipsum anim ipsum
      fugiat eiusmod. Fugiat aliquip esse ut dolor do laborum reprehenderit.
      Veniam aliqua enim ea eiusmod amet elit. Nisi adipisicing deserunt id
      proident labore incididunt duis eu nostrud pariatur eiusmod fugiat
      laborum. Irure consequat fugiat aute quis ullamco cillum id incididunt
      esse. Aliquip ipsum sint dolor id non est non proident. Consequat enim
      dolore non consequat velit incididunt est. Anim excepteur aute ad proident
      excepteur anim officia excepteur cillum ut aliquip.
    </Tooltip>
  )
}

export const Styled = () => {
  return (
    <Tooltip
      className={{
        tooltip: '"font-bold text-black" bg-red-400 italic',
        arrow: 'fill-red-400',
      }}
      tooltip="Styled Tooltip"
    >
      <Button
        className={{
          root: 'border border-solid border-uzh-grey-100 p-2 shadow-md',
        }}
      >
        Hover Me! and I can still be a Button
      </Button>
    </Tooltip>
  )
}

export const Children = () => {
  return (
    <Tooltip
      className={{ tooltip: 'bg-red-400', arrow: 'fill-red-400' }}
      tooltip={
        <div className="font-bold italic text-black">Styled Tooltip</div>
      }
    >
      <Button
        className={{
          root: 'border border-solid border-uzh-grey-100 p-2 shadow-md',
        }}
      >
        Hover Me! and I can still be a Button
      </Button>
    </Tooltip>
  )
}

export const Delay = () => {
  return (
    <Tooltip tooltip="Content Tooltip" delay={3000}>
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Delayed Tooltip...
      </div>
    </Tooltip>
  )
}
