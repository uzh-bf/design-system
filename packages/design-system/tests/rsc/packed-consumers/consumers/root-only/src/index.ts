import {
  Button,
  DirectionProvider,
  FormLabel,
  Message,
  MessageScroller,
  NativeSelect,
  Questionnaire,
  type MessageScrollerProps,
  type QuestionnaireProps,
} from '@uzh-bf/design-system'
import '@uzh-bf/design-system/css'
import '@uzh-bf/design-system/preflight.css'
import {
  Button as PrimitiveButton,
  DirectionProvider as PrimitiveDirectionProvider,
  NativeSelect as PrimitiveNativeSelect,
  tabsListVariants,
} from '@uzh-bf/design-system/primitives'

export const contract = {
  Button,
  FormLabel,
  PrimitiveButton,
  NativeSelect,
  DirectionProvider,
  PrimitiveNativeSelect,
  PrimitiveDirectionProvider,
  tabsListVariants,
}

const messageList: MessageScrollerProps = {
  items: [{ id: 'one', content: 'Synthetic' }],
  className: { viewport: 'p-2' },
  data: { test: 'list' },
}
void messageList
void Message
void MessageScroller

const clarification: QuestionnaireProps = {
  items: [
    {
      name: 'format',
      title: 'Format',
      choices: [{ value: 'brief', label: 'Brief' }],
      input: { label: 'Other', type: 'text' },
    },
  ],
  className: { root: 'p-2', choice: 'rounded-md' },
  data: { test: 'clarification' },
  onSubmit: (event) => void new FormData(event.currentTarget),
}
void clarification
void Questionnaire
