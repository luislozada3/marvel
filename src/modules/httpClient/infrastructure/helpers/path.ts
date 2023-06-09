import { PUBLIC_KEY, HASH_KEY, TIMESTAMPS } from '../../../../constants/authorizationKey'
import { BASE_URL } from '../../../../constants/url'

export const getPath = (path: string) => {
  const thereAreParameters = path.includes('?')
  const keys = `apikey=${PUBLIC_KEY}&hash=${HASH_KEY}&ts=${TIMESTAMPS}`
  const union = thereAreParameters ? '&' : '?'
  return `${BASE_URL}${path}${union}${keys}`
}
