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
  { items: vegetablesValues, showSeparator: true },
  { items: transportValues, showSeparator: true, label: 'Transport' },
  {
    items: programmingValues,
    showSeparator: true,
    label: 'Programming Languages',
  },
]

export const groupValuesDisabled = [
  { items: fruitsValues },
  { items: vegetablesValues, showSeparator: true },
  { items: transportValues, showSeparator: true, label: 'Transport' },
  {
    items: programmingValuesDisabled,
    showSeparator: true,
    label: 'Programming Languages',
  },
]
