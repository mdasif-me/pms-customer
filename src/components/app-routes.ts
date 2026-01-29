import {
  File02Icon as ProjectStroke,
  FilterMailCircleIcon as Refund,
  SaveMoneyEuroIcon as WithdrawalsIcon,
} from '@hugeicons-pro/core-stroke-rounded'

import {
  File02Icon as ProjectSolid,
  FilterMailCircleIcon as RefundSolid,
  SaveMoneyEuroIcon as WithdrawalsSolid,
} from '@hugeicons-pro/core-solid-rounded'
import { linkOptions } from '@tanstack/react-router'

const options = linkOptions([
  {
    to: '/',
    label: 'Projects',
    icon: ProjectStroke,
    solidicon: ProjectSolid,
    exact: false,
  },
  {
    to: '/withdrawals',
    label: 'Withdrawals',
    icon: WithdrawalsIcon,
    solidicon: WithdrawalsSolid,
    exact: false,
  },
  {
    to: '/refund',
    label: 'Refund',
    icon: Refund,
    solidicon: RefundSolid,
    exact: false,
  },
])
export default options
