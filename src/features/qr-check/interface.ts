export interface IQRVerificationData {
  applicant: {
    full_name: string
  }
  sale_id: string
  qr_id: string
  approved_at: string
}

export interface IQRVerificationResponse {
  status_code: number
  data: IQRVerificationData
  message?: string
}
