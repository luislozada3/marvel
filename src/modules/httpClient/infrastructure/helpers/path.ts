import { PUBLIC_KEY, HASH_KEY, TIMESTAMPS } from '../../../../constants/authorizationKey'
import { BASE_URL } from '../../../../constants/url'

export const getPath = (path: string) => {
  return `${BASE_URL}${path}?apikey=${PUBLIC_KEY}&hash=${HASH_KEY}&ts=${TIMESTAMPS}`
}
