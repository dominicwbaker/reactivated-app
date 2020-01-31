import API from './api'
import GithubAPI from './github'

export const getRepositories = () => {
  return API.get<Repository[]>(`/repositories`, {
    params: {
      filter: 'isConfigured||eq||true',
    },
  })
}

export const getRepository = (repositoryId: string) => {
  return API.get<Repository>(`/repositories/${repositoryId}`)
}

export const getRepositoryBranches = (fullName: string) => {
  return GithubAPI.get<GithubBranch[]>(`/repos/${fullName}/branches`)
}

interface ConfigureRepoParams {
  id: Repository['id']
  data: Pick<Repository, 'branch' | 'path' | 'fullName'>
}

export const configureRepository = (params: ConfigureRepoParams) => {
  return API.put<Repository>(
    `/repositories/${params.id}/configure`,
    params.data,
  )
}

export const findRepositoryByName = (name: string) => {
  return API.get<Repository[]>(`/repositories`, {
    params: {
      filter: `fullName||eq||${name}`,
    },
  })
}

export const recomputeDeps = (repoId: Repository['id']) => {
  return API.get(`/repositories/${repoId}/compute_deps`)
}