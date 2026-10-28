import {
  Button,
  DirectionProvider,
  FormLabel,
  Message,
  MessageScroller,
  NativeSelect,
  type MessageScrollerProps,
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
