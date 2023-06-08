import { PaginationUrl } from '../../shared/domain/Pagination'
import { Character } from './Character'

export interface CharacterRepository {
  getAll: (pagination?: PaginationUrl) => Promise<Character[]>
  getFavorites: () => Promise<Character[]>
  addToFavorite: (character: Character) => Promise<void>
  deleteFavorite: (id: number) => Promise<void>
}
