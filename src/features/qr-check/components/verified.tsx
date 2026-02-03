import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  CalendarIcon,
  CheckmarkBadge01Icon,
  QrCodeIcon,
  UserIcon,
} from '@hugeicons-pro/core-solid-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import { ExternalLinkIcon, ShieldCheckIcon } from 'lucide-react'
import type { IQRVerificationData } from '../interface'

export default function Verified({ data }: { data: IQRVerificationData }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-6 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Card className="max-w-2xl w-full shadow-2xl rounded-3xl overflow-hidden border border-green-200/50 bg-white/90 backdrop-blur-sm">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400" />

        <CardHeader className="text-center space-y-6 pb-8 pt-10 px-6 md:px-10">
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
              <div className="rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-5 shadow-xl shadow-green-200">
                <HugeiconsIcon
                  icon={CheckmarkBadge01Icon}
                  className="h-16 w-16 text-white"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Ownership Verified Successfully
            </h1>
            <p className="text-muted-foreground text-lg">
              This property has been successfully verified and authenticated
            </p>
          </div>
        </CardHeader>

        <CardContent className="pb-10 px-6 md:px-10">
          <div className="flex justify-center mb-8">
            <Badge className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm shadow-md">
              <HugeiconsIcon
                icon={CheckmarkBadge01Icon}
                className="h-4 w-4 mr-2"
              />
              VERIFIED & ACTIVE
            </Badge>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-green-100">
                <HugeiconsIcon
                  icon={UserIcon}
                  className="h-5 w-5 text-green-600"
                />
              </div>
              Verification Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-5 rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <HugeiconsIcon
                      icon={UserIcon}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Applicant Name
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {data.applicant.full_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <HugeiconsIcon
                      icon={CalendarIcon}
                      className="h-5 w-5 text-emerald-600"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Approved On
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {data.approved_at}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-teal-100">
                    <HugeiconsIcon
                      icon={QrCodeIcon}
                      className="h-5 w-5 text-teal-600"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Booking Number
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="font-mono text-sm px-3 py-1"
                      >
                        {data.sale_id}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Verification ID
                    </p>
                    <Badge
                      variant="outline"
                      className="font-mono text-sm px-3 py-1 bg-white"
                    >
                      BP-{data.qr_id}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Verified by{' '}
                <span className="font-semibold text-green-600">
                  Property Management System
                </span>
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              This verification is valid until next renewal cycle
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
