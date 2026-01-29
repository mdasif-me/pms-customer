import { useQuery } from '@tanstack/react-query'
import { projectApi } from './api'
import type { IListProjectsParams } from './interface'

export const useProjects = (params: IListProjectsParams = {}) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectApi.listProjects(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProject = (pid: string) => {
  return useQuery({
    queryKey: ['project', pid],
    queryFn: () => projectApi.getProject(pid),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProjectInvestments = (pid: string) => {
  return useQuery({
    queryKey: ['project-investments', pid],
    queryFn: () => projectApi.getProjectInvestments(pid),
    staleTime: 5 * 60 * 1000,
  })
}
