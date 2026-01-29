import { useQuery } from '@tanstack/react-query'
import { withdrawalApi } from './api'
import type { IWithdrawalParams } from './interface'

export const useWithdrawals = (params: IWithdrawalParams) => {
  return useQuery({
    queryKey: ['withdrawals', params],
    queryFn: () => withdrawalApi.listWithdrawals(params),
    staleTime: 5 * 60 * 1000,
  })
}
