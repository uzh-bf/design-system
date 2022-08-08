import {
  faCat,
  faCircleInfo,
  faDog,
  faGear,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'
import Navigation from './Navigation'

export const Default = () => {
  return (
    <div>
      <Navigation>
        <Navigation.NavigationMenu position="left">
          <Navigation.TriggerItem
            triggerName="Dogs"
            triggerIcon={<FontAwesomeIcon icon={faDog} />}
          >
            <Navigation.DropdownItem title="Waldo" link="https://uzh.ch" />
            <Navigation.DropdownItem title="Kuno" link="https://google.ch" />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem
            triggerName="Cats"
            triggerIcon={<FontAwesomeIcon icon={faCat} />}
          >
            <Navigation.DropdownItem title="Simba" link="https://uzh.ch" />
            <Navigation.DropdownItem title="Nala" link="https://google.ch" />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem triggerName="Drinks">
            <Navigation.DropdownItem
              title="Fanta"
              link="https://uzh.ch"
              subtitle="Tastes like oranges"
            />
            <Navigation.DropdownItem
              title="Sprite"
              link="https://uzh.ch"
              subtitle="Tastes like lemons"
            />
            <Navigation.DropdownItem
              title="Pepsi"
              link="https://uzh.ch"
              subtitle="Tastes strange"
            />
          </Navigation.TriggerItem>
          <Navigation.LinkItem
            link="https://google.ch"
            linkName="More Info"
            linkIcon={<FontAwesomeIcon icon={faCircleInfo} />}
          />
        </Navigation.NavigationMenu>
        <Navigation.NavigationMenu position="right">
          <Navigation.ButtonItem>
            <Button>Click me!</Button>
          </Navigation.ButtonItem>
          <Navigation.TriggerItem
            triggerName="User"
            triggerIcon={<FontAwesomeIcon icon={faUser} />}
          >
            <Navigation.DropdownItem
              title="Settings"
              link="https://wikipedia.org"
              icon={<FontAwesomeIcon icon={faGear} />}
            />
            <Navigation.DropdownItem
              title="Sign out"
              link="https://google.ch"
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            />
          </Navigation.TriggerItem>
        </Navigation.NavigationMenu>
      </Navigation>
    </div>
  )
}
