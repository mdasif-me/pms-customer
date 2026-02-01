import { apiClient } from '@/lib/api-client'
import type {
  IRefundCreateResponse,
  IRefundParams,
  IRefundRequest,
  IRefundResponse,
} from './interface'

const buildQueryString = (params: IRefundParams) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
}

export const refundApi = {
  listRefunds: async (params: IRefundParams): Promise<IRefundResponse> => {
    const queryString = buildQueryString(params)
    const response = await apiClient.get<IRefundResponse>(
      `/r/refund/booking?${queryString}`,
    )
    return response
  },

  createRefund: async (
    data: IRefundRequest,
  ): Promise<IRefundCreateResponse> => {
    const response = await apiClient.post<IRefundCreateResponse>(
      '/r/refund',
      data,
    )
    return response
  },
}
