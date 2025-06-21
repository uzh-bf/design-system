import {
  ShadcnDropdownMenu,
  ShadcnDropdownMenuContent,
  ShadcnDropdownMenuGroup,
  ShadcnDropdownMenuItem,
  ShadcnDropdownMenuLabel,
  ShadcnDropdownMenuPortal,
  ShadcnDropdownMenuSeparator,
  ShadcnDropdownMenuShortcut,
  ShadcnDropdownMenuSub,
  ShadcnDropdownMenuSubContent,
  ShadcnDropdownMenuSubTrigger,
  ShadcnDropdownMenuTrigger,
} from './ShadcnDropdown'
import { Button } from './ui/button'

export const Default = () => {
  return (
    <ShadcnDropdownMenu>
      <ShadcnDropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </ShadcnDropdownMenuTrigger>
      <ShadcnDropdownMenuContent className="w-56" align="start">
        <ShadcnDropdownMenuLabel>My Account</ShadcnDropdownMenuLabel>
        <ShadcnDropdownMenuGroup>
          <ShadcnDropdownMenuItem>
            Profile
            <ShadcnDropdownMenuShortcut>⇧⌘P</ShadcnDropdownMenuShortcut>
          </ShadcnDropdownMenuItem>
          <ShadcnDropdownMenuItem>
            Billing
            <ShadcnDropdownMenuShortcut>⌘B</ShadcnDropdownMenuShortcut>
          </ShadcnDropdownMenuItem>
          <ShadcnDropdownMenuItem>
            Settings
            <ShadcnDropdownMenuShortcut>⌘S</ShadcnDropdownMenuShortcut>
          </ShadcnDropdownMenuItem>
          <ShadcnDropdownMenuItem>
            Keyboard shortcuts
            <ShadcnDropdownMenuShortcut>⌘K</ShadcnDropdownMenuShortcut>
          </ShadcnDropdownMenuItem>
        </ShadcnDropdownMenuGroup>
        <ShadcnDropdownMenuSeparator />
        <ShadcnDropdownMenuGroup>
          <ShadcnDropdownMenuItem>Team</ShadcnDropdownMenuItem>
          <ShadcnDropdownMenuSub>
            <ShadcnDropdownMenuSubTrigger>
              Invite users
            </ShadcnDropdownMenuSubTrigger>
            <ShadcnDropdownMenuPortal>
              <ShadcnDropdownMenuSubContent>
                <ShadcnDropdownMenuItem>Email</ShadcnDropdownMenuItem>
                <ShadcnDropdownMenuItem>Message</ShadcnDropdownMenuItem>
                <ShadcnDropdownMenuSeparator />
                <ShadcnDropdownMenuItem>More...</ShadcnDropdownMenuItem>
              </ShadcnDropdownMenuSubContent>
            </ShadcnDropdownMenuPortal>
          </ShadcnDropdownMenuSub>
          <ShadcnDropdownMenuItem>
            New Team
            <ShadcnDropdownMenuShortcut>⌘+T</ShadcnDropdownMenuShortcut>
          </ShadcnDropdownMenuItem>
        </ShadcnDropdownMenuGroup>
        <ShadcnDropdownMenuSeparator />
        <ShadcnDropdownMenuItem>GitHub</ShadcnDropdownMenuItem>
        <ShadcnDropdownMenuItem>Support</ShadcnDropdownMenuItem>
        <ShadcnDropdownMenuItem disabled>API</ShadcnDropdownMenuItem>
        <ShadcnDropdownMenuSeparator />
        <ShadcnDropdownMenuItem>
          Log out
          <ShadcnDropdownMenuShortcut>⇧⌘Q</ShadcnDropdownMenuShortcut>
        </ShadcnDropdownMenuItem>
      </ShadcnDropdownMenuContent>
    </ShadcnDropdownMenu>
  )
}
