export interface IWithdrawalItem {
  id: string
  full_name: string
  profile_picture: string | null
  allotment_name: string
  total_paid: number
  total_withdrawal: number
  status: 'pending' | 'approved' | 'rejected'
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
