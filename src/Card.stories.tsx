import Card from './Card'

export const Default = () => (
  <Card
    backgroundSrc="https://www.gbl.uzh.ch/images/uploads/pfm_game.png"
    tags={['DBF', 'Simulation', 'Investing']}
    title="Portfolio Management Simulation"
    onClick={() => null}
  />
)

export const ContentOnly = () => <Card />
