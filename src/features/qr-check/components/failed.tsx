import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CancelCircleIcon } from '@hugeicons-pro/core-solid-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CalendarIcon,
  ExternalLinkIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from 'lucide-react'

export default function Failed({ message }: { message?: string }) {
  console.error('QR Verification Failed:', message)
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-6 bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Card className="max-w-2xl w-full shadow-2xl rounded-3xl overflow-hidden border border-red-200/50 bg-white/90 backdrop-blur-sm">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-rose-400 to-pink-400" />

        <CardHeader className="text-center space-y-6 w-full pb-8 pt-10 px-6 md:px-10">
          <div className="relative flex justify-center w-full">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20" />
              <div className="rounded-full bg-gradient-to-br from-red-400 to-rose-500 p-5 shadow-xl shadow-red-200">
                <HugeiconsIcon
                  icon={CancelCircleIcon}
                  className="h-16 w-16 text-white"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 flex justify-center w-full">
            <article>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Verification Failed
              </h1>
              <p className="text-muted-foreground text-lg">
                Unable to verify this QR code at this time
              </p>
            </article>
          </div>
        </CardHeader>

        <CardContent className="pb-10 px-6 md:px-10">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-red-100">
                <HugeiconsIcon
                  icon={CancelCircleIcon}
                  className="h-5 w-5 text-red-600"
                />
              </div>
              Possible Reasons
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-4 rounded-xl border border-red-100 bg-gradient-to-br from-white to-red-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-100 mt-0.5">
                    <QrCodeIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Invalid or Expired
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      QR code may be invalid or past expiration date
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-100 bg-gradient-to-br from-white to-red-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-100 mt-0.5">
                    <ShieldCheckIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Not Found
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      QR code not registered in the system
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-100 bg-gradient-to-br from-white to-red-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-100 mt-0.5">
                    <CalendarIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Pending Approval
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Verification is awaiting administrative approval
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-100 bg-gradient-to-br from-white to-red-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-100 mt-0.5">
                    <HugeiconsIcon
                      icon={CancelCircleIcon}
                      className="h-5 w-5 text-red-600"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Already Used
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      QR code has already been scanned and used
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center space-y-6">
            <div className="inline-flex flex-col items-center gap-3">
              <p className="text-muted-foreground">
                Need immediate assistance?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="rounded-full px-6 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-red-200 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">
                Email support:{' '}
                <a
                  href="mailto:support@propertymanagement.com"
                  className="font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  support@propertymanagement.com
                </a>
              </p>
              <p className="text-xs text-muted-foreground">
                Response time: Usually within 2 business hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
