import { useQuery } from '@tanstack/react-query'
import { qrCheckApi } from './api'

export const useVerifyQR = (qrId: string) => {
  return useQuery({
    queryKey: ['qr-verification', qrId],
    queryFn: () => qrCheckApi.verifyQR(qrId),
    enabled: !!qrId,
    retry: false,
  })
}
