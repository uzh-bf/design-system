import { useState, type ComponentProps, type FormEvent } from 'react'
import { DayPicker, enUS, faIR } from 'react-day-picker/persian'
import { useForm } from 'react-hook-form'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Bubble,
  CodeBlock,
  Message,
  MessageScroller,
  Questionnaire,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  Trace,
  useSidebar,
} from './index'
import {
  Badge,
  Button,
  CalendarDayButton,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './primitives'
import { Form, RhfTextField } from './react-hook-form'

export default { title: 'Application compositions' }

const chartConfig = {
  learners: {
    label: 'Active learners',
    color: 'var(--chart-1)',
  },
} as const

const chartData = [
  { day: 'Mon', learners: 42 },
  { day: 'Tue', learners: 54 },
  { day: 'Wed', learners: 48 },
  { day: 'Thu', learners: 61 },
  { day: 'Fri', learners: 57 },
]

type DashboardSection = 'overview' | 'reports'

function DashboardSurface() {
  const [section, setSection] = useState<DashboardSection>('overview')
  const { isMobile, setOpenMobile } = useSidebar()

  const selectSection = (next: DashboardSection) => {
    setSection(next)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <>
      <Sidebar aria-label="Course navigation">
        <SidebarHeader className="border-sidebar-border border-b p-4">
          <p className="text-sidebar-foreground text-sm font-semibold">
            Learning studio
          </p>
          <p className="text-sidebar-foreground/70 text-xs">
            Synthetic workspace
          </p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={section === 'overview'}
                    data-test="comp-nav-overview"
                    onClick={() => selectSection('overview')}
                  >
                    Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={section === 'reports'}
                    data-test="comp-nav-reports"
                    onClick={() => selectSection('reports')}
                  >
                    Reports
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="min-w-0 overflow-x-hidden">
        <header className="border-border flex min-h-16 flex-wrap items-center gap-3 border-b px-4 py-2">
          <SidebarTrigger
            aria-label="Toggle course navigation"
            data-test="comp-sidebar-trigger"
          />
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Application composition
            </p>
            <h1 className="text-lg font-semibold">Course activity</h1>
          </div>
        </header>

        <div className="grid min-w-0 gap-6 p-4 lg:p-6">
          <section
            className="min-w-0 rounded-lg border p-4"
            aria-labelledby="dashboard-section-title"
            data-test="comp-section"
            data-section={section}
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2
                  id="dashboard-section-title"
                  className="text-base font-semibold"
                >
                  {section === 'reports'
                    ? 'Weekly learning report'
                    : 'Workspace overview'}
                </h2>
                <p className="text-muted-foreground mt-1 max-w-2xl text-sm break-words">
                  A local view composed from synthetic course activity. The
                  sidebar changes this section without routing or persistence.
                </p>
              </div>
              <Badge variant="secondary">This week</Badge>
            </div>

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
              <Card className="min-w-0 overflow-hidden">
                <CardHeader>
                  <CardTitle>Active learners by weekday</CardTitle>
                  <CardDescription>
                    Values are counts from a five-day synthetic sample.
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-w-0">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-64 min-h-64 w-full min-w-0"
                    role="img"
                    aria-label="Bar chart of active learners by weekday"
                    data-test="comp-chart"
                  >
                    <BarChart
                      data={chartData}
                      margin={{ top: 12, right: 4, left: 4 }}
                      accessibilityLayer
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      <Bar
                        dataKey="learners"
                        fill="var(--color-learners)"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle>At a glance</CardTitle>
                  <CardDescription>
                    The same synthetic weekday counts shown in the chart.
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-w-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-2">Weekday</TableHead>
                        <TableHead className="px-2">Active learners</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chartData.map((row) => (
                        <TableRow key={row.day}>
                          <TableCell className="px-2 font-medium">
                            {row.day}
                          </TableCell>
                          <TableCell className="px-2 tabular-nums">
                            {row.learners}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="text-muted-foreground mt-4 text-sm break-words">
                    Peak activity is{' '}
                    {Math.max(...chartData.map((row) => row.learners))} active
                    learners. The table repeats the chart values in text.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </SidebarInset>
    </>
  )
}

export const Dashboard = () => (
  <div
    className="bg-background text-foreground min-h-svh min-w-0 overflow-x-hidden pt-16"
    data-test="comp-dashboard"
  >
    <SidebarProvider>
      <DashboardSurface />
    </SidebarProvider>
  </div>
)

type AuthValues = {
  email: string
  password: string
}

export const Authentication = () => {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<AuthValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  const submit = () => setSubmitted(true)

  const reset = () => {
    setSubmitted(false)
    form.reset({ email: '', password: '' })
  }

  return (
    <main className="bg-background text-foreground min-h-svh min-w-0 overflow-x-hidden px-4 pt-16 pb-8">
      <div className="mx-auto grid w-full max-w-5xl min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
        <section className="min-w-0" aria-labelledby="auth-title">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            Application composition
          </p>
          <h1 id="auth-title" className="mt-1 text-2xl font-semibold">
            Sign in
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm break-words">
            Validation and submission stay in this fixture. The form uses React
            Hook Form and the design-system field adapter.
          </p>

          <Form {...form}>
            <form
              className="mt-6 grid max-w-lg gap-4 rounded-lg border p-5"
              noValidate
              onSubmit={form.handleSubmit(submit)}
              onReset={reset}
              aria-label="Synthetic sign in"
            >
              <RhfTextField
                control={form.control}
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                placeholder="learner@example.invalid"
                required
                rules={{
                  required: 'Enter an email address.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter an email address in the expected format.',
                  },
                }}
                data={{ test: 'comp-auth-email' }}
              />
              <RhfTextField
                control={form.control}
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                placeholder="Synthetic passphrase"
                required
                rules={{
                  required: 'Enter a password.',
                  minLength: {
                    value: 8,
                    message: 'Use at least eight characters.',
                  },
                }}
                data={{ test: 'comp-auth-password' }}
              />
              <div className="flex flex-wrap gap-2">
                <Button type="submit" data-test="comp-auth-submit">
                  Sign in
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  data-test="comp-auth-reset"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </section>

        <aside className="min-w-0 self-start rounded-lg border p-5">
          <h2 className="text-base font-semibold">Local result</h2>
          <p className="text-muted-foreground mt-2 text-sm break-words">
            A successful submit records only synthetic state. No credentials are
            stored or sent.
          </p>
          <output
            className="bg-muted mt-4 block min-w-0 rounded-md p-3 text-sm break-words"
            aria-live="polite"
            data-test="comp-auth-result"
            data-submitted={submitted ? 'true' : 'false'}
          >
            {submitted
              ? 'Synthetic sign-in accepted locally.'
              : 'Not submitted.'}
          </output>
        </aside>
      </div>
    </main>
  )
}

type ConversationMessage = {
  id: number
  author: 'Assistant' | 'You'
  align: 'start' | 'end'
  text: string
}

const initialMessages: ConversationMessage[] = [
  {
    id: 1,
    author: 'Assistant',
    align: 'start',
    text: 'I prepared a small evidence bundle for the synthetic review.',
  },
  {
    id: 2,
    author: 'You',
    align: 'end',
    text: 'Show the checks, then ask which summary format fits.',
  },
]

const questionnaireItems = [
  {
    name: 'format',
    title: 'Choose a summary format',
    description: 'The selected value is read from the submitted FormData.',
    required: true,
    data: { test: 'comp-questionnaire-question' },
    choices: [
      {
        value: 'brief',
        label: 'Brief',
        description: 'Three short sentences',
        data: { test: 'comp-questionnaire-choice' },
      },
      {
        value: 'table',
        label: 'Table',
        description: 'Rows and columns',
      },
    ],
  },
] as const

const codeSample = 'const evidence = "synthetic";'

export const Conversation = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [questionnaireResult, setQuestionnaireResult] = useState<
    [string, FormDataEntryValue][] | null
  >(null)

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        author: 'You',
        align: 'end',
        text,
      },
    ])
    setDraft('')
  }

  const submitQuestionnaire = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuestionnaireResult([...new FormData(event.currentTarget)])
  }

  return (
    <main className="bg-background text-foreground min-h-svh min-w-0 overflow-x-hidden px-4 pt-16 pb-8">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 gap-6">
        <header className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            Application composition
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            Conversation and clarification
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm break-words">
            Static messages, local appends, a trace disclosure, code copy, and a
            one-question form composed from public components.
          </p>
        </header>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <section
            className="min-w-0 overflow-hidden rounded-lg border"
            aria-labelledby="conversation-title"
          >
            <div className="border-b px-4 py-3">
              <h2 id="conversation-title" className="font-semibold">
                Review thread
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                <span data-test="comp-message-count">{messages.length}</span>{' '}
                messages
              </p>
            </div>

            <MessageScroller
              autoScroll
              ariaLabel="Synthetic review conversation"
              items={messages.map((message, index) => ({
                id: String(message.id),
                scrollAnchor: index === messages.length - 1,
                content: (
                  <Message
                    align={message.align}
                    avatar={
                      <span
                        className="bg-secondary text-secondary-foreground flex size-8 items-center justify-center rounded-full text-xs font-semibold"
                        aria-hidden="true"
                      >
                        {message.author === 'Assistant' ? 'A' : 'Y'}
                      </span>
                    }
                    header={
                      <span className="text-sm font-medium">
                        {message.author}
                      </span>
                    }
                    data={{ test: 'comp-message-' + message.id }}
                    className={{ root: 'min-w-0' }}
                  >
                    <Bubble
                      variant={message.align === 'end' ? 'secondary' : 'muted'}
                      reactions={
                        message.author === 'Assistant' ? (
                          <span className="text-muted-foreground text-xs">
                            Synthetic source
                          </span>
                        ) : undefined
                      }
                    >
                      <span className="break-words">{message.text}</span>
                    </Bubble>
                  </Message>
                ),
              }))}
              data={{ test: 'comp-message-list' }}
              dataViewport={{ test: 'comp-message-viewport' }}
              className={{
                root: 'h-[28rem] min-w-0',
                viewport: 'px-4',
                content: 'gap-4 py-4',
                item: 'min-w-0',
              }}
            />

            <form
              className="border-t p-4"
              onSubmit={sendMessage}
              aria-label="Send a local message"
            >
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="conversation-message"
              >
                Follow-up message
              </label>
              <div className="flex min-w-0 flex-wrap gap-2">
                <Input
                  id="conversation-message"
                  className="min-w-0 flex-1"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a synthetic follow-up"
                  data-test="comp-message-input"
                />
                <Button
                  type="submit"
                  disabled={!draft.trim()}
                  data-test="comp-send"
                >
                  Send
                </Button>
              </div>
            </form>
          </section>

          <div className="grid min-w-0 content-start gap-6">
            <section
              className="min-w-0 rounded-lg border p-4"
              aria-labelledby="trace-title"
            >
              <h2 id="trace-title" className="font-semibold">
                Trace
              </h2>
              <p className="text-muted-foreground mt-1 mb-3 text-sm">
                Expand the completed step to inspect and copy its local output.
              </p>
              <Trace
                data={{ test: 'comp-trace' }}
                items={[
                  {
                    id: 'evidence',
                    title: 'Evidence prepared',
                    description: 'Synthetic sample',
                    content: (
                      <CodeBlock
                        code={codeSample}
                        language="ts"
                        titleContent="evidence.ts"
                        copy={{
                          'aria-label': 'Copy synthetic evidence code',
                        }}
                        data={{ test: 'comp-code' }}
                        dataContent={{ test: 'comp-code-content' }}
                        dataCopy={{ test: 'comp-code-copy' }}
                        className={{
                          root: 'max-w-full min-w-0',
                          content: 'max-w-full',
                        }}
                      />
                    ),
                  },
                  {
                    id: 'review',
                    title: 'Local review complete',
                    description: 'No network request',
                  },
                ]}
              />
            </section>

            <section
              className="min-w-0 rounded-lg border p-4"
              aria-labelledby="questionnaire-title"
            >
              <h2 id="questionnaire-title" className="font-semibold">
                Clarification
              </h2>
              <p className="text-muted-foreground mt-1 mb-3 text-sm">
                Submit one choice and inspect the native FormData result.
              </p>
              <Questionnaire
                aria-label="Summary format questionnaire"
                items={questionnaireItems}
                data={{ test: 'comp-questionnaire' }}
                dataSubmit={{ test: 'comp-questionnaire-submit' }}
                onSubmit={submitQuestionnaire}
              />
              <output
                className="text-muted-foreground mt-3 block min-w-0 text-sm break-words"
                aria-live="polite"
                data-test="comp-questionnaire-result"
                data-submitted={questionnaireResult ? 'true' : 'false'}
              >
                {questionnaireResult
                  ? JSON.stringify(questionnaireResult)
                  : 'Not submitted.'}
              </output>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

const FIXED_SELECTED_TIME = Date.UTC(2026, 9, 15, 8, 30)

const persianClassNames = {
  root: 'rdp-root [--cell-size:36px] w-full min-w-0 select-none',
  months: 'flex min-w-0 flex-col',
  month: 'grid min-w-0 gap-3',
  month_caption:
    'rdp-month_caption flex min-h-9 items-center justify-center px-10 text-center font-semibold',
  caption_label: 'text-base font-semibold',
  nav: 'rdp-nav flex justify-between',
  button_previous:
    'inline-flex size-8 items-center justify-center rounded-md border text-sm',
  button_next:
    'inline-flex size-8 items-center justify-center rounded-md border text-sm',
  weekdays: 'rdp-weekdays grid grid-cols-7',
  weekday: 'text-muted-foreground py-1 text-center text-xs',
  weeks: 'grid gap-1',
  week: 'rdp-week grid grid-cols-7 gap-1',
  day: 'flex min-w-0 items-center justify-center p-0',
  day_button: 'min-w-0',
  outside: 'opacity-40',
}

function PersianDayButton(props: ComponentProps<typeof CalendarDayButton>) {
  return <CalendarDayButton {...props} locale={faIR} />
}

function formatSelectedDate(date: Date | undefined, persian: boolean) {
  if (!date) return 'No date selected'
  return new Intl.DateTimeFormat(
    persian ? 'fa-IR-u-ca-persian' : 'en-US-u-ca-persian',
    {
      dateStyle: 'long',
      timeZone: 'UTC',
    }
  ).format(date)
}

export const PersianCalendar = () => {
  const [selected, setSelected] = useState<Date>(() => {
    return new Date(FIXED_SELECTED_TIME)
  })
  const [persian, setPersian] = useState(true)

  return (
    <main className="bg-background text-foreground min-h-svh min-w-0 overflow-x-hidden px-4 pt-16 pb-8">
      <div className="mx-auto grid w-full max-w-5xl min-w-0 gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <section className="min-w-0" aria-labelledby="persian-title">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            Application composition
          </p>
          <h1 id="persian-title" className="mt-1 text-2xl font-semibold">
            Persian calendar
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm break-words">
            The installed native Persian recipe renders Jalali months and days.
            Presentation controls change locale and direction while preserving
            the selected JavaScript Date.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPersian((value) => !value)}
              data-test="comp-persian-toggle"
              aria-pressed={!persian}
            >
              {persian ? 'Use English, LTR' : 'Use Persian, RTL'}
            </Button>
          </div>
          <dl className="mt-5 grid gap-3 rounded-lg border p-4 text-sm">
            <div className="min-w-0">
              <dt className="text-muted-foreground">Selected value</dt>
              <dd className="mt-1 break-words">
                <output
                  data-test="comp-persian-value"
                  data-timestamp={selected.getTime()}
                >
                  {formatSelectedDate(selected, persian)}
                </output>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Presentation</dt>
              <dd className="mt-1">
                {persian ? 'Persian, RTL, Persian numerals' : 'English, LTR'}
              </dd>
            </div>
          </dl>
        </section>

        <section
          className="min-w-0 rounded-lg border p-3 sm:p-5"
          aria-label="Native Persian calendar composition"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) setSelected(date)
            }}
            defaultMonth={new Date(FIXED_SELECTED_TIME)}
            locale={persian ? faIR : enUS}
            dir={persian ? 'rtl' : 'ltr'}
            numerals={persian ? 'arabext' : 'latn'}
            timeZone="UTC"
            captionLayout="label"
            components={{ DayButton: PersianDayButton }}
            classNames={persianClassNames}
            aria-label={
              persian
                ? 'تقویم انتخابی به تقویم هجری شمسی'
                : 'Selected date in the Persian calendar'
            }
            data-test="comp-persian-calendar"
          />
          <p className="text-muted-foreground mt-4 text-xs break-words">
            Each day button keeps Gregorian calendar metadata in data-day. The
            visible month and day names come from the native Persian recipe.
          </p>
        </section>
      </div>
    </main>
  )
}
