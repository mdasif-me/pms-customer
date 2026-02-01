import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toastManager } from '@/components/ui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateWithdrawal } from '../hooks'
import type { IWithdrawalRequest } from '../interface'
import { withdrawalRequestSchema } from '../interface'

export default function WithdrawalRequest({
  projectId,
  bookingId,
}: {
  projectId: string
  bookingId?: string
}) {
  const [open, setOpen] = useState(false)
  const { mutate: createWithdrawal, isPending } = useCreateWithdrawal()

  const form = useForm<IWithdrawalRequest>({
    resolver: zodResolver(withdrawalRequestSchema),
    defaultValues: {
      project_id: projectId,
      booking_id: bookingId || '',
      amount: '',
    },
  })

  const handleSubmit = () => {
    const amount = form.getValues('amount')?.trim()

    if (!bookingId) {
      toastManager.add({
        title: 'booking id required',
        description: 'please provide booking id via url',
        type: 'error',
      })
      return
    }

    if (!amount || Number(amount) <= 0) {
      toastManager.add({
        title: 'invalid amount',
        description: 'please enter a valid withdrawal amount',
        type: 'error',
      })
      return
    }

    createWithdrawal(
      {
        project_id: projectId,
        booking_id: bookingId,
        amount: amount,
      },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      },
    )
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={<Button variant="primary" className="md:gap-2 gap-1" />}
      >
        <PlusIcon className="md:size-4 size-3" />
        <span className="md:inline hidden">Withdraw Request</span>
        <span className="md:hidden">Withdraw</span>
      </SheetTrigger>
      <SheetPopup inset className="max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>Add New Withdraw Request</SheetTitle>
          <SheetDescription>
            Fill the form below to submit a new withdraw request.
          </SheetDescription>
        </SheetHeader>
        <Separator />

        <SheetPanel className="max-h-[calc(100vh-180px)] h-lvh">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Withdrawal Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount to withdraw"
                {...form.register('amount')}
                disabled={isPending}
              />
              {form.formState.errors.amount && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
          </div>
        </SheetPanel>

        <Separator />
        <SheetFooter>
          <div className="flex items-center w-full justify-between">
            <SheetClose
              render={<Button variant="ghost" />}
              disabled={isPending}
            >
              cancel
            </SheetClose>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
              className="md:min-w-40"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'submitting...' : 'submit request'}
            </Button>
          </div>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
