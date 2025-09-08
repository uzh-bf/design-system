export const fruitsValues = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pear', label: 'Pear' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'peach', label: 'Peach' },
  { value: 'mango', label: 'Mango' },
]
export const vegetablesValues = [
  { value: 'carrot', label: 'Carrot' },
  { value: 'cucumber', label: 'Cucumber' },
  { value: 'onion', label: 'Onion' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'broccoli', label: 'Broccoli' },
]
export const transportValues = [
  { value: 'car', label: 'Car' },
  { value: 'bike', label: 'Bike' },
  { value: 'train', label: 'Train' },
  { value: 'plane', label: 'Plane' },
  { value: 'boat', label: 'Boat' },
  { value: 'bus', label: 'Bus' },
]
export const programmingValues = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
]

export const programmingValuesDisabled = [
  { value: 'javascript', label: 'JavaScript (disabled)', disabled: true },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python (disabled)', disabled: true },
  { value: 'ruby', label: 'Ruby' },
  { value: 'java', label: 'Java (disabled)' },
  { value: 'csharp', label: 'C#' },
]

export const groupValues = [
  { items: fruitsValues },
  { items: vegetablesValues },
  { items: transportValues, label: 'Transport' },
  {
    items: programmingValues,

    label: 'Programming Languages',
  },
]

export const groupValuesDisabled = [
  { items: fruitsValues },
  { items: vegetablesValues },
  { items: transportValues, label: 'Transport' },
  {
    items: programmingValuesDisabled,

    label: 'Programming Languages',
  },
]

export const sidebarData = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#',
        },
        {
          title: 'Project Structure',
          url: '#',
        },
      ],
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#',
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true,
        },
        {
          title: 'Rendering',
          url: '#',
        },
        {
          title: 'Caching',
          url: '#',
        },
        {
          title: 'Styling',
          url: '#',
        },
        {
          title: 'Optimizing',
          url: '#',
        },
        {
          title: 'Configuring',
          url: '#',
        },
        {
          title: 'Testing',
          url: '#',
        },
        {
          title: 'Authentication',
          url: '#',
        },
        {
          title: 'Deploying',
          url: '#',
        },
        {
          title: 'Upgrading',
          url: '#',
        },
        {
          title: 'Examples',
          url: '#',
        },
      ],
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#',
        },
        {
          title: 'File Conventions',
          url: '#',
        },
        {
          title: 'Functions',
          url: '#',
        },
        {
          title: 'next.config.js Options',
          url: '#',
        },
        {
          title: 'CLI',
          url: '#',
        },
        {
          title: 'Edge Runtime',
          url: '#',
        },
      ],
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#',
        },
        {
          title: 'Fast Refresh',
          url: '#',
        },
        {
          title: 'Next.js Compiler',
          url: '#',
        },
        {
          title: 'Supported Browsers',
          url: '#',
        },
        {
          title: 'Turbopack',
          url: '#',
        },
      ],
    },
  ],
}

export const stepProgressStatusItems = [
  { type: 'question', status: 'correct', id: 'id_1', points: 3, maxPoints: 3 },
  {
    type: 'question',
    status: 'incorrect',
    id: 'id_2',
    points: 0,
    maxPoints: 2,
  },
  {
    type: 'markdown',
    status: 'unanswered',
    id: 'id_3',
  },
  { type: 'question', status: 'partial', id: 'id_4', points: 1, maxPoints: 2 },
  { type: 'question', status: 'correct', id: 'id_5', points: 2, maxPoints: 2 },
  { type: 'question', status: 'correct', id: 'id_6', points: 2, maxPoints: 2 },
  { type: 'markdown', status: 'unanswered', id: 'id_7' },
  { type: 'markdown', status: 'unanswered', id: 'id_8', disabled: true },
  { type: 'question', status: 'unanswered', id: 'id_9' },
]

export const workflowItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Step 3' },
]

export const workflowItemsDescription = [
  {
    title: 'Step 1',
    description: 'This is the first step',
  },
  {
    title: 'Step 2',
    description: 'This is the second step',
  },
  {
    title: 'Step 3',
    description: 'This is the third step',
  },
  {
    title: 'Step 4',
  },
]

export const workflowTooltipItems = [
  {
    title: 'Step 1',
    tooltip: 'This is the first step',
    tooltipDisabled: 'This step is disabled',
  },
  {
    title: 'Step 2',
    tooltip: 'This is the second step',
  },
  {
    title: 'Step 3',
    tooltipDisabled: 'This step is disabled',
  },
]
