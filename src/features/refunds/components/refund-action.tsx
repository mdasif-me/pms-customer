import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useCreateRefund } from '../hooks'

interface RefundActionProps {
  projectId: string
  bookingId: string
}

export default function RefundAction({
  projectId,
  bookingId,
}: RefundActionProps) {
  const [open, setOpen] = useState(false)
  const { mutate: createRefund, isPending } = useCreateRefund()

  const handleConfirm = () => {
    createRefund(
      {
        project_id: projectId,
        booking_id: bookingId,
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      },
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="mono" size="sm" disabled={isPending}>
          <ChevronLeft className="size-4 inline-block text-primary/30 -ml-2" />
          <ChevronLeft className="size-4 inline-block text-primary/60 -ml-2" />
          <ChevronLeft className="size-4 inline-block text-primary -ml-2 -mr-2" />
          <span className="mx-3">Refund</span>
          <ChevronRight className="size-4 inline-block text-primary -ml-2" />
          <ChevronRight className="size-4 inline-block text-primary/60 -ml-2" />
          <ChevronRight className="size-4 inline-block text-primary/30 -ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <p className="text-sm">Are you sure you want to request a refund?</p>
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button size="sm" disabled={isPending} onClick={handleConfirm}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
