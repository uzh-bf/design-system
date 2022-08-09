import {
  faCat,
  faCircleInfo,
  faDog,
  faGear,
  faQuestionCircle,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'
import Navigation from './Navigation'

export const Default = () => {
  return (
    <div>
      <Navigation className="z-50">
        <Navigation.NavigationMenu position="left">
          <Navigation.TriggerItem
            triggerName="Dogs"
            triggerIcon={<FontAwesomeIcon icon={faDog} />}
          >
            <Navigation.DropdownItem
              title="Waldo"
              onClick={() => (location.href = 'https://google.ch')}
            />
            <Navigation.DropdownItem
              title="Kuno"
              onClick={() => (location.href = 'https://uzh.ch')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem
            triggerName="Cats"
            triggerIcon={<FontAwesomeIcon icon={faCat} />}
          >
            <Navigation.DropdownItem
              title="Simba"
              onClick={() => (location.href = 'https://uzh.ch')}
            />
            <Navigation.DropdownItem
              title="Nala"
              onClick={() => (location.href = 'https://google.ch')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem triggerName="Drinks">
            <Navigation.DropdownItem
              title="Fanta"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Fanta')
              }
              subtitle="Tastes like oranges"
            />
            <Navigation.DropdownItem
              title="Sprite"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Sprite_(drink)')
              }
              subtitle="Tastes like lemons"
            />
            <Navigation.DropdownItem
              title="Pepsi"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Pepsi')
              }
              subtitle="Tastes like Coca Cola"
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
            triggerName="Support"
            triggerIcon={<FontAwesomeIcon icon={faQuestionCircle} />}
          >
            <Navigation.DropdownItem
              title="Call"
              onClick={() => (location.href = 'https://google.ch')}
            />
            <Navigation.DropdownItem
              title="eMail"
              onClick={() => alert('Send an email')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem
            triggerName="User"
            triggerIcon={<FontAwesomeIcon icon={faUser} />}
          >
            <Navigation.DropdownItem
              title="Settings"
              onClick={() => (location.href = 'https://google.ch')}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
            <Navigation.DropdownItem
              title="Sign out"
              onClick={() => alert('You have been signed out')}
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            />
          </Navigation.TriggerItem>
        </Navigation.NavigationMenu>
      </Navigation>
    </div>
  )
}

export const Left = () => {
  return (
    <div>
      <Navigation className="z-50">
        <Navigation.NavigationMenu position="left">
          <Navigation.TriggerItem
            triggerName="Dogs"
            triggerIcon={<FontAwesomeIcon icon={faDog} />}
          >
            <Navigation.DropdownItem
              title="Waldo"
              onClick={() => (location.href = 'https://google.ch')}
            />
            <Navigation.DropdownItem
              title="Kuno"
              onClick={() => (location.href = 'https://uzh.ch')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem
            triggerName="Cats"
            triggerIcon={<FontAwesomeIcon icon={faCat} />}
          >
            <Navigation.DropdownItem
              title="Simba"
              onClick={() => (location.href = 'https://uzh.ch')}
            />
            <Navigation.DropdownItem
              title="Nala"
              onClick={() => (location.href = 'https://google.ch')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem triggerName="Drinks">
            <Navigation.DropdownItem
              title="Fanta"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Fanta')
              }
              subtitle="Tastes like oranges"
            />
            <Navigation.DropdownItem
              title="Sprite"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Sprite_(drink)')
              }
              subtitle="Tastes like lemons"
            />
            <Navigation.DropdownItem
              title="Pepsi"
              onClick={() =>
                (location.href = 'https://en.wikipedia.org/wiki/Pepsi')
              }
              subtitle="Tastes like Coca Cola"
            />
          </Navigation.TriggerItem>
          <Navigation.LinkItem
            link="https://google.ch"
            linkName="More Info"
            linkIcon={<FontAwesomeIcon icon={faCircleInfo} />}
          />
        </Navigation.NavigationMenu>
      </Navigation>
    </div>
  )
}

export const Right = () => {
  return (
    <div>
      <Navigation className="z-50">
        <Navigation.NavigationMenu position="right">
          <Navigation.ButtonItem>
            <Button>Click me!</Button>
          </Navigation.ButtonItem>
          <Navigation.TriggerItem
            triggerName="Support"
            triggerIcon={<FontAwesomeIcon icon={faQuestionCircle} />}
          >
            <Navigation.DropdownItem
              title="Call"
              onClick={() => (location.href = 'https://google.ch')}
            />
            <Navigation.DropdownItem
              title="eMail"
              onClick={() => alert('Send an email')}
            />
          </Navigation.TriggerItem>
          <Navigation.TriggerItem
            triggerName="User"
            triggerIcon={<FontAwesomeIcon icon={faUser} />}
          >
            <Navigation.DropdownItem
              title="Settings"
              onClick={() => (location.href = 'https://google.ch')}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
            <Navigation.DropdownItem
              title="Sign out"
              onClick={() => alert('You have been signed out')}
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            />
          </Navigation.TriggerItem>
        </Navigation.NavigationMenu>
      </Navigation>
    </div>
  )
}
