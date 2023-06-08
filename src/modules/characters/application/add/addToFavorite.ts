import { Character, makeSureYouCanAddInFavorites } from '../../domain/Character'
import { CharacterRepository } from '../../domain/CharacterRepository'

const addToFavorite = async (characterRepository: CharacterRepository, character: Character) => {
  const addedCharacters = await characterRepository.getFavorites()

  makeSureYouCanAddInFavorites(addedCharacters, character)

  await characterRepository.addToFavorite(character)
}

export default addToFavorite
