import { apiClient } from '@/lib/api-client'
import type { IQRVerificationResponse } from './interface'

export const qrCheckApi = {
  verifyQR: async (qrId: string): Promise<IQRVerificationResponse> => {
    try {
      const response = await apiClient.get<IQRVerificationResponse>(
        `/b/v/${qrId}`,
      )
      return response as IQRVerificationResponse
    } catch (error: any) {
      throw new Error(error?.message || 'failed to verify qr code')
    }
  },
}
