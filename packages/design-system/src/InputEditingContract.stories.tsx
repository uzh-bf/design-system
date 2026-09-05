import { useState } from 'react'
import { DateTimePicker } from './DatetimePicker'
import { Modal } from './Modal'

const initialDate = () => new Date(2026, 0, 15, 13, 24, 35)

export function Default() {
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [cycle, setCycle] = useState<12 | 24>(24)
  const [granularity, setGranularity] = useState<'hour' | 'minute' | 'second'>(
    'second'
  )
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cloneUpdates, setCloneUpdates] = useState(false)
  return (
    <div className="flex flex-col gap-4 p-4">
      <DateTimePicker
        id="editing-date"
        label="Appointment"
        value={date}
        onChange={(value) =>
          setDate(value && cloneUpdates ? new Date(value) : value)
        }
        hourCycle={cycle}
        granularity={granularity}
        dataTrigger={{ test: 'editing-date-trigger' }}
      />
      <DateTimePicker label="Other appointment" value={initialDate()} />
      <label>
        Clone date updates
        <input
          type="checkbox"
          checked={cloneUpdates}
          onChange={(event) => setCloneUpdates(event.target.checked)}
        />
      </label>
      <output data-test="date-value">
        {date
          ? [
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              date.getSeconds(),
            ].join(',')
          : ''}
      </output>
      <button type="button" onClick={() => setCycle(cycle === 24 ? 12 : 24)}>
        Toggle cycle
      </button>
      <button
        type="button"
        onClick={() =>
          setGranularity(granularity === 'second' ? 'minute' : 'hour')
        }
      >
        Reduce precision
      </button>
      <button
        type="button"
        data-test="external-date"
        onClick={() => setDate(new Date(2026, 0, 15, 9, 8, 7))}
      >
        External update
      </button>
      <label>
        Background input
        <input data-test="background-input" defaultValue="outside" />
      </label>
      <button type="button" onClick={() => setOpen(true)}>
        Open navigation
      </button>
      <output data-test="position">{position}</output>
      <Modal
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        title="Navigation"
        onNext={() => setPosition((p) => p + 1)}
        onPrev={() => setPosition((p) => p - 1)}
        dataContent={{ test: 'navigation-dialog' }}
      >
        <button type="button" onClick={() => setLoading(true)}>
          Start loading
        </button>
        <div tabIndex={0} data-test="navigation-surface">
          Navigation surface
        </div>
        <label>
          Notes
          <input data-test="modal-input" defaultValue="inside" />
        </label>
        <div
          contentEditable
          suppressContentEditableWarning
          data-test="modal-editable"
        >
          Editable notes
        </div>
        <label>
          Amount
          <input type="range" aria-label="Amount" />
        </label>
        <button type="button" data-test="nested-control">
          Nested control
        </button>
        <div
          tabIndex={0}
          data-test="prevented"
          onKeyDown={(event) => event.preventDefault()}
        >
          Own keyboard handling
        </div>
      </Modal>
    </div>
  )
}
