import {
  DashboardSquare01Icon as DashboardStroke,
  File02Icon as ProjectStroke,
  FilterMailCircleIcon as Refund,
  SaveMoneyEuroIcon as WithdrawalsIcon,
} from '@hugeicons-pro/core-stroke-rounded'

import {
  DashboardSquare01Icon as DashboardSolid,
  File02Icon as ProjectSolid,
  FilterMailCircleIcon as RefundSolid,
  SaveMoneyEuroIcon as WithdrawalsSolid,
} from '@hugeicons-pro/core-solid-rounded'
import { linkOptions } from '@tanstack/react-router'

const options = linkOptions([
  {
    to: '/',
    label: 'Dashboard',
    icon: DashboardStroke,
    solidicon: DashboardSolid,
    activeOptions: { exact: true },
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: ProjectStroke,
    solidicon: ProjectSolid,
  },
  {
    to: '/withdrawals',
    label: 'Withdrawals',
    icon: WithdrawalsIcon,
    solidicon: WithdrawalsSolid,
    activeOptions: { exact: true },
  },
  {
    to: '/refund',
    label: 'Refund',
    icon: Refund,
    solidicon: RefundSolid,
    activeOptions: { exact: true },
  },
])
export default options
