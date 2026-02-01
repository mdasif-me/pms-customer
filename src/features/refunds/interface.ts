export interface IRefundItem {
  id: string
  full_name: string
  profile_picture: string | null
  allotment_name: string
  total_paid: number
  total_refund: number
  status: 'pending' | 'approved' | 'rejected'
}

export interface IRefundEdge {
  node: string
  data: IRefundItem[]
}

export interface IRefundResponse {
  status_code: number
  message: string
  edges: IRefundEdge[]
}

export interface IRefundParams {
  project_id: string
  booking_id: string
  status?: 'pending' | 'approved' | 'rejected' | 'all'
}

export interface IRefundRequest {
  project_id: string
  booking_id: string
}

export interface IRefundCreateResponse {
  status_code: number
  message: string
}
