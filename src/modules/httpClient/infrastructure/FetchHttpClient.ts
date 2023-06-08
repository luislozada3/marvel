import { HttpClient } from '../domain/HttpClient'
import { getPath } from './helpers/path'

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const httpFetch: HttpClient = {
  get: async <T>(path: string, config?: any) => {
    const response = await fetch(getPath(path), { ...config, method: 'GET', headers })
    const data: T = (await response.json()) as T
    return data
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await fetch(getPath(path), {
      ...config,
      body: params ? JSON.stringify(params) : null,
      method: 'POST',
      headers
    })
    const data: T = (await response.json()) as T
    return data
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await fetch(getPath(path), {
      ...config,
      body: params ? JSON.stringify(params) : null,
      method: 'PUT',
      headers
    })
    const data: T = (await response.json()) as T
    return data
  },
  patch: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await fetch(getPath(path), {
      ...config,
      body: params ? JSON.stringify(params) : null,
      method: 'PATCH',
      headers
    })
    const data: T = (await response.json()) as T
    return data
  },
  delete: async <T>(path: string, config?: any) => {
    const response = await fetch(getPath(path), { ...config, method: 'DELETE', headers })
    const data: T = (await response.json()) as T
    return data
  }
}

export default httpFetch
