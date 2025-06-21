import {
  ShadcnTable,
  ShadcnTableBody,
  ShadcnTableCaption,
  ShadcnTableCell,
  ShadcnTableFooter,
  ShadcnTableHead,
  ShadcnTableHeader,
  ShadcnTableRow,
} from './ShadcnTable'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

export const Default = () => {
  return (
    <ShadcnTable>
      <ShadcnTableCaption>A list of your recent invoices.</ShadcnTableCaption>
      <ShadcnTableHeader>
        <ShadcnTableRow>
          <ShadcnTableHead className="w-[100px]">Invoice</ShadcnTableHead>
          <ShadcnTableHead>Status</ShadcnTableHead>
          <ShadcnTableHead>Method</ShadcnTableHead>
          <ShadcnTableHead className="text-right">Amount</ShadcnTableHead>
        </ShadcnTableRow>
      </ShadcnTableHeader>
      <ShadcnTableBody>
        {invoices.map((invoice) => (
          <ShadcnTableRow key={invoice.invoice}>
            <ShadcnTableCell className="font-medium">
              {invoice.invoice}
            </ShadcnTableCell>
            <ShadcnTableCell>{invoice.paymentStatus}</ShadcnTableCell>
            <ShadcnTableCell>{invoice.paymentMethod}</ShadcnTableCell>
            <ShadcnTableCell className="text-right">
              {invoice.totalAmount}
            </ShadcnTableCell>
          </ShadcnTableRow>
        ))}
      </ShadcnTableBody>
      <ShadcnTableFooter>
        <ShadcnTableRow>
          <ShadcnTableCell colSpan={3}>Total</ShadcnTableCell>
          <ShadcnTableCell className="text-right">$2,500.00</ShadcnTableCell>
        </ShadcnTableRow>
      </ShadcnTableFooter>
    </ShadcnTable>
  )
}
