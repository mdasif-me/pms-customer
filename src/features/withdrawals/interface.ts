import { z } from 'zod'

export interface IWithdrawalItem {
  id: string
  full_name: string
  profile_picture: string | null
  allotment_name: string
  total_paid: number
  total_withdrawal: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface IWithdrawalParams {
  project_id: string
  status?: 'pending' | 'approved' | 'rejected'
}

export interface IWithdrawalResponse {
  status_code: number
  message: string
  edges: Array<{
    node: string
    data: IWithdrawalItem[]
  }>
}

export interface IWithdrawalRequest {
  project_id: string
  booking_id: string
  amount: string
}

export interface IWithdrawalCreateResponse {
  status_code: number
  message: string
  data?: any
}

export const withdrawalRequestSchema = z.object({
  project_id: z.string().min(1, 'project id is required'),
  booking_id: z.string().min(1, 'booking id is required'),
  amount: z.string().min(1, 'amount is required'),
})
