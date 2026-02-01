import { toastManager } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { withdrawalApi } from './api'
import type { IWithdrawalParams } from './interface'

export const useWithdrawals = (params: IWithdrawalParams) => {
  return useQuery({
    queryKey: ['withdrawals', params],
    queryFn: () => withdrawalApi.listWithdrawals(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: withdrawalApi.createWithdrawal,
    onSuccess: (data) => {
      if (data.status_code !== 201) {
        toastManager.add({
          title: 'message',
          description: data.message,
          type: 'info',
        })
      } else {
        toastManager.add({
          title: 'success',
          description: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
      }
    },
    onError: (error) => {
      toastManager.add({
        title: 'error',
        description: error.message,
        type: 'error',
      })
    },
  })
}
