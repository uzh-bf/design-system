import { Check, Info, User } from 'lucide-react'
import { useRef, useState } from 'react'

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  EmptyDescription,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Kbd,
  KbdGroup,
  PaginationNext,
  PaginationPrevious,
  Spinner,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
  useCarousel,
} from './primitives'

export default { title: 'Shared presentation' }

export const Surfaces = () => {
  const [actions, setActions] = useState(0)
  return (
    <div
      className="bg-background text-foreground grid w-full max-w-4xl gap-6 p-4"
      data-test="shared-surfaces"
    >
      <Alert variant="info">
        <Info aria-hidden="true" />
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>
          A synthetic notification with enough detail to wrap on a compact
          display. The action remains available when the explanation occupies
          several lines.
        </AlertDescription>
        <AlertAction data-test="alert-action" title="Notification actions">
          <Button size="sm" onClick={() => setActions(actions + 1)}>
            Acknowledge
          </Button>
        </AlertAction>
      </Alert>
      <output data-test="action-count">{actions}</output>
      <div className="flex flex-wrap items-center gap-3">
        {([undefined, 'default', 'sm', 'md', 'lg'] as const).map((size) => (
          <Avatar
            size={size}
            key={size ?? 'omitted'}
            data-test={`avatar-${size ?? 'omitted'}`}
          >
            <AvatarImage
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath fill='%23215caf' d='M0 0h80v80H0z'/%3E%3C/svg%3E"
              alt="Synthetic avatar"
            />
            <AvatarFallback>AB</AvatarFallback>
            <AvatarBadge
              data-test={`avatar-badge-${size ?? 'omitted'}`}
              role="img"
              aria-label="Available"
            >
              <Check />
            </AvatarBadge>
          </Avatar>
        ))}
        <AvatarGroup
          role="group"
          aria-label="Example participants"
          data-test="avatar-group"
        >
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <AvatarGroupCount data-test="avatar-count">+2</AvatarGroupCount>
        </AvatarGroup>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge data-test="badge-default">Default</Badge>
        <Badge variant="ghost" data-test="badge-ghost">
          Ghost
        </Badge>
        <Badge variant="link" asChild>
          <a href="#shared-end" data-test="badge-link">
            Link
          </a>
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {([undefined, 'default', 'sm'] as const).map((size) => (
          <Card
            size={size}
            data-test={`card-${size ?? 'omitted'}`}
            key={size ?? 'omitted'}
          >
            <CardHeader>
              <CardTitle>Example card</CardTitle>
            </CardHeader>
            <CardContent>
              Content keeps a readable inset at each explicit density.
            </CardContent>
            <CardFooter>Footer</CardFooter>
          </Card>
        ))}
      </div>
      <Card size="sm" data-test="card-override">
        <CardContent className="px-10">
          Caller padding
          <Card size="default" data-test="card-nested">
            <CardContent>Nested default density</CardContent>
          </Card>
        </CardContent>
      </Card>
      <ItemGroup role="list" aria-label="Example resources">
        <Item role="listitem" size="xs" data-test="item-xs">
          <ItemMedia>
            <User aria-hidden="true" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Compact resource</ItemTitle>
            <ItemDescription data-test="item-description">
              A paragraph description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item role="listitem" size="sm" data-test="item-sm">
          <ItemContent>
            <ItemTitle>Small resource</ItemTitle>
          </ItemContent>
        </Item>
        <Item role="listitem" data-test="item-default">
          <ItemContent>
            <ItemTitle>Default resource</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
      <ItemGroup data-test="generic-item-group">
        <Item asChild>
          <a href="#shared-end">Standalone resource link</a>
        </Item>
      </ItemGroup>
      <span id="shared-end" />
    </div>
  )
}

export const Controls = () => {
  const [checked, setChecked] = useState(false)
  const [submitted, setSubmitted] = useState<
    Record<string, FormDataEntryValue>
  >({})
  const [selected, setSelected] = useState<string[]>([])
  const [pin, setPin] = useState('')
  const switchRef = useRef<HTMLButtonElement>(null)
  return (
    <div
      className="bg-background text-foreground grid max-w-xl gap-6 p-4"
      data-test="shared-controls"
    >
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(Object.fromEntries(new FormData(event.currentTarget)))
        }}
      >
        <label className="flex items-center gap-3">
          Default switch
          <Switch
            name="enabled"
            checked={checked}
            onCheckedChange={setChecked}
            data-test="switch-omitted"
            ref={switchRef}
          />
        </label>
        <label className="flex items-center gap-3">
          Explicit default
          <Switch size="default" data-test="switch-default" />
        </label>
        <label className="flex items-center gap-3">
          Small switch
          <Switch size="sm" data-test="switch-sm" />
        </label>
        <label className="flex items-center gap-3">
          Disabled switch
          <Switch size="sm" disabled data-test="switch-disabled" />
        </label>
        <InputOTP
          aria-label="Verification code"
          maxLength={4}
          name="pin"
          value={pin}
          onChange={setPin}
          data-test="otp-default"
        >
          <InputOTPGroup>
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <InputOTP
          aria-label="Spell checking override"
          maxLength={2}
          spellCheck
          data-test="otp-override"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => switchRef.current?.focus()}
            data-test="focus-switch"
          >
            Focus switch
          </Button>
          <Button type="submit" data-test="submit-controls">
            Submit
          </Button>
        </div>
      </form>
      <output data-test="submitted-controls">
        {JSON.stringify(submitted)}
      </output>
      <ToggleGroup
        type="multiple"
        value={selected}
        onValueChange={setSelected}
        aria-label="Joined options"
        data-test="toggle-joined"
      >
        <ToggleGroupItem value="a" aria-label="Option A">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Option B">
          B
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        spacing={2}
        variant="outline"
        aria-label="Spaced options"
        data-test="toggle-spaced"
      >
        <ToggleGroupItem value="a" aria-label="First spaced">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Second spaced">
          B
        </ToggleGroupItem>
      </ToggleGroup>
      <div dir="rtl">
        <ToggleGroup
          type="single"
          dir="rtl"
          orientation="vertical"
          spacing={0}
          aria-label="Vertical options"
          data-test="toggle-vertical"
        >
          <ToggleGroupItem value="a" aria-label="First vertical">
            A
          </ToggleGroupItem>
          <ToggleGroupItem value="b" aria-label="Second vertical">
            B
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <output data-test="toggle-value">{JSON.stringify(selected)}</output>
      <div className="flex flex-wrap gap-2">
        <PaginationPrevious
          href="#previous"
          text="Earlier"
          data-test="pagination-text"
        />
        <PaginationNext
          href="#next"
          text="Ignored alias"
          label="Legacy next"
          aria-label="Legacy next: native pagination override"
          data-test="pagination-label"
        />
        <PaginationNext
          href="#empty"
          text="Ignored alias"
          label=""
          data-test="pagination-empty"
        />
      </div>
    </div>
  )
}

function CarouselState() {
  const { selectedIndex, scrollSnaps, scrollTo } = useCarousel()
  return (
    <div className="flex items-center gap-2">
      <Button
        data-test="carousel-last"
        onClick={() => scrollTo(scrollSnaps.length - 1)}
      >
        Last slide
      </Button>
      <output data-test="carousel-index">{selectedIndex}</output>
    </div>
  )
}

export const RetainedComposition = () => (
  <div
    className="bg-background text-foreground grid w-full max-w-lg gap-6 p-4"
    data-test="shared-retained"
  >
    <div className="flex items-center gap-4">
      <Spinner data-test="spinner-default" />
      <Button disabled>
        <Spinner className="size-4" data-test="spinner-button" />
        Loading
      </Button>
    </div>
    <InputGroup aria-label="Loading input group">
      <InputGroupAddon>
        <Spinner className="size-4" data-test="spinner-addon" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Loading example" />
    </InputGroup>
    <Item>
      <ItemMedia>
        <Spinner className="size-4" data-test="spinner-item" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Loading resource</ItemTitle>
      </ItemContent>
    </Item>
    <EmptyDescription data-test="empty-description">
      An accurately typed description.
    </EmptyDescription>
    <KbdGroup data-test="kbd-group">
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
    <Carousel
      className="mx-10 min-w-0"
      opts={{ duration: 0 }}
      aria-label="Example slides"
    >
      <CarouselContent>
        {[0, 1, 2].map((index) => (
          <CarouselItem key={index}>
            <div className="grid h-24 place-items-center rounded-md border">
              Slide {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselState />
    </Carousel>
  </div>
)
