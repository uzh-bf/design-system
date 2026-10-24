import { Portal as PopoverPortal } from '@radix-ui/react-popover'
import { Check, Info } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './primitives'

export default { title: 'Shared interactions' }

export const Overlays = () => {
  const [submitted, setSubmitted] = useState(0)
  const [cancelled, setCancelled] = useState(0)
  return (
    <div
      className="bg-background text-foreground flex flex-wrap gap-4 p-4 pt-16"
      data-test="shared-overlays"
    >
      {([undefined, 'sm'] as const).map((size) => (
        <AlertDialog key={size ?? 'omitted'}>
          <AlertDialogTrigger asChild>
            <Button data-test={`open-alert-${size ?? 'omitted'}`}>
              Confirm {size ?? 'default'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size={size} data-test="alert-content">
            <AlertDialogHeader>
              <AlertDialogMedia title="Information" data-test="alert-media">
                <Info aria-hidden="true" />
              </AlertDialogMedia>
              <AlertDialogTitle>Confirm a synthetic action</AlertDialogTitle>
              <AlertDialogDescription>
                Native button and cancellation behavior remain available.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(submitted + 1)
              }}
            >
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCancelled(cancelled + 1)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  size="sm"
                  variant="outline"
                  className="h-6"
                  onClick={(event) => event.preventDefault()}
                  data-test="keep-alert"
                >
                  Keep open
                </AlertDialogAction>
                <AlertDialogAction
                  type="submit"
                  size="sm"
                  data-test="submit-alert"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      ))}
      {([undefined, true] as const).map((showCloseButton) => (
        <Dialog key={String(showCloseButton)}>
          <DialogTrigger asChild>
            <Button data-test={`open-dialog-${showCloseButton ?? 'omitted'}`}>
              Dialog {showCloseButton ? 'footer close' : 'default footer'}
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <div className="fixed inset-0 z-50 grid place-items-center p-4">
              <DialogContent data-test="dialog-content">
                <DialogHeader>
                  <DialogTitle>Synthetic dialog</DialogTitle>
                  <DialogDescription>
                    Caller-owned portal and overlay.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter
                  showCloseButton={showCloseButton}
                  data-test="dialog-footer"
                >
                  <span>Footer content</span>
                </DialogFooter>
              </DialogContent>
            </div>
          </DialogPortal>
        </Dialog>
      ))}
      {([undefined, false] as const).map((showCloseButton) => (
        <Sheet key={String(showCloseButton)}>
          <SheetTrigger asChild>
            <Button data-test={`open-sheet-${showCloseButton ?? 'omitted'}`}>
              Sheet{' '}
              {showCloseButton === false ? 'without close' : 'default close'}
            </Button>
          </SheetTrigger>
          <SheetContent
            showCloseButton={showCloseButton}
            data-test="sheet-content"
          >
            <SheetHeader>
              <SheetTitle>Synthetic sheet</SheetTitle>
              <SheetDescription>
                Escape remains available with either close-button setting.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
      {([false, true] as const).map((portaled) => {
        const content = (
          <PopoverContent
            aria-labelledby={`popover-title-${portaled}`}
            data-test="popover-content"
          >
            <PopoverHeader>
              <PopoverTitle
                id={`popover-title-${portaled}`}
                data-test="popover-title"
              >
                Synthetic details
              </PopoverTitle>
              <PopoverDescription data-test="popover-description">
                Native description content.
              </PopoverDescription>
            </PopoverHeader>
            <Button data-test="popover-focus">Focusable action</Button>
          </PopoverContent>
        )
        return (
          <div key={String(portaled)} data-test={`popover-owner-${portaled}`}>
            <Popover>
              <PopoverTrigger asChild>
                <Button data-test={`open-popover-${portaled}`}>
                  Popover {portaled ? 'explicit portal' : 'inline'}
                </Button>
              </PopoverTrigger>
              {portaled ? <PopoverPortal>{content}</PopoverPortal> : content}
            </Popover>
          </div>
        )
      })}
      <output data-test="overlay-submitted">{submitted}</output>
      <output data-test="overlay-cancelled">{cancelled}</output>
    </div>
  )
}

export const Menus = () => {
  const [checked, setChecked] = useState(false)
  const [radio, setRadio] = useState('a')
  return (
    <div
      dir="rtl"
      className="bg-background text-foreground flex flex-wrap gap-4 p-4 pt-16"
      data-test="shared-menus"
    >
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button data-test="open-dropdown">Dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
            onSelect={(event) => event.preventDefault()}
            data-test="dropdown-checkbox-default"
          >
            Default checkbox
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            inset
            checked={checked}
            onCheckedChange={setChecked}
            onSelect={(event) => event.preventDefault()}
            data-test="dropdown-checkbox-inset"
          >
            Inset checkbox
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
            <DropdownMenuRadioItem value="a" data-test="dropdown-radio-default">
              First radio
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              inset
              value="b"
              data-test="dropdown-radio-inset"
            >
              Second radio
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-test="open-submenu">
              More
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem data-test="submenu-action">
                Nested action
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <ContextMenu dir="rtl">
        <ContextMenuTrigger
          className="rounded-md border p-3"
          data-test="open-context"
          tabIndex={0}
        >
          Context menu target
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
            data-test="context-checkbox-default"
          >
            Default checkbox
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            inset
            checked={checked}
            onCheckedChange={setChecked}
            data-test="context-checkbox-inset"
          >
            Inset checkbox
          </ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value={radio} onValueChange={setRadio}>
            <ContextMenuRadioItem value="a" data-test="context-radio-default">
              First radio
            </ContextMenuRadioItem>
            <ContextMenuRadioItem
              inset
              value="b"
              data-test="context-radio-inset"
            >
              Second radio
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <Menubar dir="rtl">
        <MenubarMenu>
          <MenubarTrigger data-test="open-menubar">Menu</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
              data-test="menubar-checkbox-default"
            >
              Default checkbox
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              inset
              checked={checked}
              onCheckedChange={setChecked}
              data-test="menubar-checkbox-inset"
            >
              Inset checkbox
            </MenubarCheckboxItem>
            <MenubarRadioGroup value={radio} onValueChange={setRadio}>
              <MenubarRadioItem value="a" data-test="menubar-radio-default">
                First radio
              </MenubarRadioItem>
              <MenubarRadioItem inset value="b" data-test="menubar-radio-inset">
                Second radio
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <output data-test="menu-checked">{String(checked)}</output>
      <output data-test="menu-radio">{radio}</output>
    </div>
  )
}

export const CommandAndSelect = () => {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState('')
  return (
    <div
      className="bg-background text-foreground grid w-full max-w-xl gap-6 p-4"
      data-test="shared-command-select"
    >
      <Command defaultValue="unchecked" className="border">
        <CommandInput aria-label="Search synthetic commands" />
        <CommandList>
          <CommandGroup>
            <CommandItem
              value="unchecked"
              data-checked={false}
              data-test="command-unchecked"
            >
              Unchecked
            </CommandItem>
            <CommandItem
              value="checked"
              data-checked
              data-test="command-checked"
            >
              Checked
            </CommandItem>
            <CommandItem
              value="shortcut"
              data-checked="true"
              data-test="command-shortcut"
            >
              With shortcut<CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem value="legacy" data-test="command-legacy">
              Caller indicator
              <Check
                aria-hidden="true"
                data-test="caller-check"
                className="ml-auto size-4"
              />
            </CommandItem>
            <CommandItem
              asChild
              value="anchor"
              data-checked
              data-test="command-anchor"
            >
              <a href="#checked-anchor">Linked command</a>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator data-test="command-separator" />
          <CommandSeparator alwaysRender data-test="command-separator-always" />
        </CommandList>
      </Command>
      <Button onClick={() => setOpen(true)} data-test="open-command-dialog">
        Command dialog
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Synthetic palette"
        description="Accessible implicit Command wrapper"
        showCloseButton={false}
      >
        <CommandInput aria-label="Palette search" />
        <CommandList>
          <CommandGroup>
            <CommandItem>Palette action</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <form
        className="flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(
            JSON.stringify(
              Object.fromEntries(new FormData(event.currentTarget))
            )
          )
        }}
      >
        {(['omitted', 'popper', 'item-aligned'] as const).map((position) => (
          <Select key={position} name={position} defaultValue="a">
            <SelectTrigger
              size={position === 'popper' ? 'sm' : 'default'}
              hideIcon={position === 'popper'}
              aria-label={`Choose ${position}`}
              data-test={`select-${position}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              position={position === 'omitted' ? undefined : position}
              align="end"
            >
              <SelectGroup>
                <SelectItem value="a">First</SelectItem>
                <SelectItem value="b">Second</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
        <Button type="submit" data-test="submit-selects">
          Submit choices
        </Button>
      </form>
      <output data-test="select-submitted">{submitted}</output>
    </div>
  )
}
