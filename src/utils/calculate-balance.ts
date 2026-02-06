import type { IRefundItem } from '@/features/refunds/interface'
import type { IWithdrawalItem } from '@/features/withdrawals/interface'

export interface IBalanceCalculation {
  totalPaid: number
  totalWithdrawal: number
  totalRefund: number
  totalDeduction: number
  availableBalance: number
}

export const calculateAvailableBalance = (
  withdrawals: IWithdrawalItem[] = [],
  refunds: IRefundItem[] = [],
): IBalanceCalculation => {
  const totalPaid = withdrawals[0]?.total_paid || refunds[0]?.total_paid || 0

  const totalWithdrawal = withdrawals
    .filter((item) => item.status === 'approved' || item.status === 'pending')
    .reduce((sum, item) => sum + (item.total_withdrawal || 0), 0)

  const totalRefund = refunds
    .filter((item) => item.status === 'approved' || item.status === 'pending')
    .reduce((sum, item) => sum + (item.total_refund || 0), 0)

  const totalDeduction = totalWithdrawal + totalRefund
  const availableBalance = totalPaid - totalDeduction

  return {
    totalPaid,
    totalWithdrawal,
    totalRefund,
    totalDeduction,
    availableBalance,
  }
}
