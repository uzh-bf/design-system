import {
  faCat,
  faCircleInfo,
  faDog,
  faWineBottle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import Button from './Button'
import Navigation from './Navigation'
import { ThemeContext } from './ThemeProvider'

const Navigation1 = () => {
  return (
    <Navigation>
      <Navigation.TriggerItem
        label="Dogs"
        icon={<FontAwesomeIcon icon={faDog} />}
        dropdownWidth="w-[10rem]"
      >
        <Navigation.DropdownItem title="Waldo" href="https://www.uzh.ch" />
        <Navigation.DropdownItem
          title="Kuno"
          onClick={() => console.log('Kuno')}
        />
      </Navigation.TriggerItem>
      <Navigation.TriggerItem
        label="Cats"
        icon={<FontAwesomeIcon icon={faCat} />}
        dropdownWidth="w-[16rem]"
      >
        <Navigation.DropdownItem
          title="Simba"
          onClick={() => console.log('Simba')}
        />
        <Navigation.DropdownItem
          title="Nala"
          onClick={() => console.log('Nala')}
        />
      </Navigation.TriggerItem>
      <Navigation.TriggerItem label="Drinks" dropdownWidth="w-[16rem]">
        <Navigation.DropdownItem
          title="Fanta"
          onClick={() => console.log('Fanta')}
          subtitle="Tastes like oranges"
          icon={<FontAwesomeIcon icon={faWineBottle} />}
          className={{ icon: 'mr-2' }}
        />
        <Navigation.DropdownItem
          title="Sprite"
          onClick={() => console.log('Sprite')}
          subtitle="Tastes like lemons"
        />
        <Navigation.DropdownItem
          title="Pepsi"
          onClick={() => console.log('Pepsi')}
          subtitle="Tastes like Coca Cola"
          icon={<FontAwesomeIcon icon={faWineBottle} />}
          className={{ icon: 'mr-2' }}
        />
      </Navigation.TriggerItem>
      <Navigation.ButtonItem
        href="https://www.uzh.ch"
        label="More Info"
        icon={<FontAwesomeIcon icon={faCircleInfo} />}
      />
    </Navigation>
  )
}

const Navigation2 = () => {
  return (
    <Navigation>
      <Navigation.TriggerItem label="Drinks" dropdownWidth="w-[16rem]">
        <Navigation.DropdownItem
          title="Fanta"
          onClick={() => console.log('Fanta')}
          subtitle="Tastes like oranges"
        />
        <Navigation.DropdownItem
          title="Sprite"
          onClick={() => console.log('Sprite')}
          subtitle="Tastes like lemons"
        />
        <Navigation.DropdownItem
          title="Pepsi"
          onClick={() => console.log('Pepsi')}
          subtitle="Tastes like Coca Cola"
        />
      </Navigation.TriggerItem>
      <Navigation.ButtonItem
        href="https://www.uzh.ch"
        label="More Info"
        icon={<FontAwesomeIcon icon={faCircleInfo} />}
      />
      <Navigation.ButtonItem
        label="More Info Log"
        onClick={() => console.log('More Info')}
      />
    </Navigation>
  )
}

export const Default = () => {
  return <Navigation1 />
}

export const Right = () => {
  return (
    <div className="float-right">
      <Navigation1 />
    </div>
  )
}

export const Combined = () => {
  const theme = useContext(ThemeContext)

  return (
    <div
      className={`flex flex-row justify-between ${theme.primaryBg} rounded-md`}
    >
      <Navigation1 />
      <Navigation2 />
    </div>
  )
}

export const CustomElements = () => {
  return (
    <Navigation>
      <Navigation.TriggerItem label="Drinks" dropdownWidth="w-[16rem]">
        <Navigation.DropdownItem
          title="Fanta"
          onClick={() => console.log('Fanta')}
          subtitle="Tastes like oranges"
        />
        <Navigation.DropdownItem
          title="Sprite"
          onClick={() => console.log('Sprite')}
          subtitle="Tastes like lemons"
        />
        <Navigation.DropdownItem
          title="Pepsi"
          onClick={() => console.log('Pepsi')}
          subtitle="Tastes like Coca Cola"
        />
      </Navigation.TriggerItem>
      <Navigation.CustomItem>
        <Button onClick={() => console.log('test button was pressed')}>
          TEST
        </Button>
      </Navigation.CustomItem>
    </Navigation>
  )
}
