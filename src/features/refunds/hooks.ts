import { toastManager } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { refundApi } from './api'
import type { IRefundParams } from './interface'

export const useRefunds = (params: IRefundParams) => {
  return useQuery({
    queryKey: ['refunds', params],
    queryFn: () => refundApi.listRefunds(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateRefund = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: refundApi.createRefund,
    onSuccess: (data) => {
      if (data.status_code !== 201 && data.status_code !== 200) {
        toastManager.add({
          title: 'Message',
          description: data.message,
          type: 'info',
        })
      } else {
        toastManager.add({
          title: 'Success',
          description: data.message,
          type: 'success',
        })
        queryClient.invalidateQueries({ queryKey: ['refunds'] })
      }
    },
    onError: (error) => {
      toastManager.add({
        title: 'Error',
        description: error.message,
        type: 'error',
      })
    },
  })
}
