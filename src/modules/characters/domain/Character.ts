import {
  canYouAddMoreFavouriteCharacters,
  characterIsAlreadyAddedInFavorite,
  errorWhenThereIsAlreadyAPersonInFavorite,
  errorWhenTryingToAddAFavoriteCharacter
} from './CharactersFavorites'

export interface Character {
  id: number
  name: string
  thumbnail: string
}

export const makeSureYouCanAddInFavorites = (addedCharacters: Character[], characterToAdd: Character) => {
  const totalCharactersAddedToFavorites = addedCharacters.length
  if (!canYouAddMoreFavouriteCharacters(totalCharactersAddedToFavorites)) {
    throw errorWhenTryingToAddAFavoriteCharacter()
  }

  if (characterIsAlreadyAddedInFavorite(addedCharacters, characterToAdd)) {
    throw errorWhenThereIsAlreadyAPersonInFavorite()
  }

  return true
}
