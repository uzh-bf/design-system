import CycleProgress from './CycleProgress'

export function Default() {
  return <CycleProgress percentage={60}>60</CycleProgress>
}

export function Small() {
  return (
    <CycleProgress percentage={60} size="sm" strokeWidthRem={0.2}>
      60
    </CycleProgress>
  )
}

export function Colored() {
  return (
    <CycleProgress percentage={60} color="#FF0000">
      60
    </CycleProgress>
  )
}

export function OverrideSize() {
  return (
    <div>
      Depending on the type of font that was chosen, it is possible that the
      text does not appear centered. In this case, it might be necessary to
      override the size, which is set manually. However, this is explicitely set
      as an override to only be used when necessary. Whenever an override is
      used, the className root will probably also have to be adapted accordingly
      <CycleProgress
        percentage={60}
        overrideSize={35}
        className={{ root: 'h-20 w-20 text-xl' }}
      >
        60
      </CycleProgress>
    </div>
  )
}
