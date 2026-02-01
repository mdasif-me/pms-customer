import { useQuery } from '@tanstack/react-query'
import { refundApi } from './api'
import type { IRefundParams } from './interface'

export const useRefunds = (params: IRefundParams) => {
  return useQuery({
    queryKey: ['refunds', params],
    queryFn: () => refundApi.listRefunds(params),
    staleTime: 5 * 60 * 1000,
  })
}
