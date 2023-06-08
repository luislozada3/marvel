import { Character } from '../domain/Character'
import { CharacterRepository } from '../domain/CharacterRepository'

import { ReponseCharacterDTO } from './DTO/CharacterDTO'

import { getAllCharactersMappers } from './mappers/getAllCharactersMapper'

import httpFetch from '../../httpClient/infrastructure/FetchHttpClient'

const getAll = async (): Promise<Character[]> => {
  const response = await httpFetch.get<ReponseCharacterDTO>('/characters')
  const { results } = response.data

  const characters = results.map(getAllCharactersMappers)
  return characters
}

const getFavorites = async (): Promise<Character[]> => {
  const localStorageFavorites = localStorage.getItem('favoriteCharacters')
  const favoriteCharacters = localStorageFavorites ? JSON.parse(localStorageFavorites) : []
  return favoriteCharacters
}

const addToFavorite = async (character: Character): Promise<void> => {
  const favorites = await getFavorites()
  const newFavoritesArray = [...favorites, character]
  localStorage.setItem('favoriteCharacters', JSON.stringify(newFavoritesArray))
}

const deleteFavorite = async (characterId: number) => {
  const favorites = await getFavorites()
  const newFavoritesArray = favorites.filter(favorite => favorite.id !== characterId)
  localStorage.setItem('favoriteCharacters', JSON.stringify(newFavoritesArray))
}

const FetchCharacterRepository: CharacterRepository = {
  getAll,
  getFavorites,
  addToFavorite,
  deleteFavorite
}

export default FetchCharacterRepository
