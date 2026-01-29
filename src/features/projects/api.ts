import type { IApiResponse, IApiResponseSingle } from '@/interface'
import { apiClient } from '../../lib/api-client'
import type { IListProjectsParams, IProjectList } from './interface'
import type { TCreateProject } from './schema'

const buildQueryString = (params: IListProjectsParams): string => {
  const queryParams = new URLSearchParams()
  if (params.offset !== undefined)
    queryParams.append('offset', String(params.offset))
  if (params.limit !== undefined)
    queryParams.append('limit', String(params.limit))
  if (params.search) queryParams.append('search', params.search)
  return queryParams.toString()
}

export const projectApi = {
  listProjects: (
    params: IListProjectsParams,
  ): Promise<IApiResponse<IProjectList>> => {
    const queryString = buildQueryString(params)
    const endpoint = queryString ? `/r/p/l?${queryString}` : '/r/p/l'
    return apiClient.get<IApiResponse<IProjectList>>(endpoint)
  },

  getProject: (pid: string): Promise<IApiResponseSingle<IProjectList>> => {
    return apiClient.get<IApiResponseSingle<IProjectList>>(`/p/${pid}`)
  },

  createProject: (
    data: TCreateProject,
  ): Promise<IApiResponse<IProjectList>> => {
    return apiClient.post<IApiResponse<IProjectList>>('/p/c', data)
  },

  updateProject: (
    pid: string,
    data: Partial<TCreateProject>,
  ): Promise<IApiResponse<IProjectList>> => {
    return apiClient.patch<IApiResponse<IProjectList>>(`/p/${pid}`, data)
  },
}
