import { Character } from './Character'

export type CharactersFavorites = Character[]

const MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS = 5

export const canYouAddMoreFavouriteCharacters = (totalCharactersAddedToFavorites: number) => {
  return totalCharactersAddedToFavorites < MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS
}

export const errorWhenTryingToAddAFavoriteCharacter = () => {
  return new Error(`You cannot add more characters, maximum (${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS})`)
}

export const characterIsAlreadyAddedInFavorite = (favoriteCharactersAdded: Character[], characterToAdd: Character) => {
  return favoriteCharactersAdded.some(favoriteCharacter => favoriteCharacter.id === characterToAdd.id)
}

export const errorWhenThereIsAlreadyAPersonInFavorite = () => {
  return new Error('The character was already added')
}
