import { apiClient } from '@/lib/api-client'
import type {
  IWithdrawalCreateResponse,
  IWithdrawalParams,
  IWithdrawalRequest,
  IWithdrawalResponse,
} from './interface'

const buildQueryString = (params: IWithdrawalParams): string => {
  const queryParams = new URLSearchParams()
  queryParams.append('project_id', params.project_id)
  queryParams.append('booking_id', params.booking_id)
  if (params.status) queryParams.append('status', params.status)
  return queryParams.toString()
}

export const withdrawalApi = {
  listWithdrawals: (
    params: IWithdrawalParams,
  ): Promise<IWithdrawalResponse> => {
    const queryString = buildQueryString(params)
    return apiClient.get<IWithdrawalResponse>(
      `/r/withdraw/by-booking?${queryString}`,
    )
  },
  createWithdrawal: (
    data: IWithdrawalRequest,
  ): Promise<IWithdrawalCreateResponse> => {
    return apiClient.post('/r/withdraw', data)
  },
}
