export interface IAllotment {
  name: string
  icon: string
  total_price: number
  assigned_shares: number
}

export interface ICompanyInfo {
  tin: string
  name: string
  type: string
  website: string
  vat_number: string
  email_address: string
  mailing_address: string
  registered_address: string
  registration_number: string
  verification_status: 'verified' | 'pending'
  trade_license_number: string
  date_of_incorporation: string
}

export interface ICompany {
  id: string
  full_name: string | null
  profile_picture: string | null
  phone_number: string
  email_address: string | null
  company_info: ICompanyInfo
}

export interface IProjectList {
  booking_id: string
  id: string
  title: string
  gallery: string[]
  allotment_name: string
  total_price: number
  total_paid: number
  sell_by: string
  created_at: string
}

export interface IListProjectsParams {
  offset?: number
  limit?: number
  search?: string
}

export interface IInvestmentItem {
  booking_id: string
  full_name: string
  profile_picture: string
  project_name: string
  allotment_name: string
  total_amount: number
  total_paid: number
  sell_by: string
  received_at: string
  status: 'approved' | 'pending' | 'rejected'
}

export interface IProjectInvestmentData {
  bookings: IInvestmentItem[]
  installments: IInvestmentItem[]
  full_payment: IInvestmentItem | null
}
