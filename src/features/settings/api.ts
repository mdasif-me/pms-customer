import type { IApiResponseSingle } from '@/interface'
import { apiClient } from '../../lib/api-client'
import type { IUser } from './interface'
import type { TUpdateProfile } from './schema'

export const profileApi = {
  updateProfile: (
    data: Partial<TUpdateProfile>,
  ): Promise<IApiResponseSingle<IUser>> => {
    const payload = {
      company_info: { ...data },
    }
    return apiClient.patch<IApiResponseSingle<IUser>>(
      `/u?scope=update_information`,
      payload,
    )
  },
}
