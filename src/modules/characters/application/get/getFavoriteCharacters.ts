import { CharacterRepository } from '../../domain/CharacterRepository'

const getFavoriteCharacters = async (characterRepository: CharacterRepository) => {
  const favorites = await characterRepository.getFavorites()
  return favorites
}

export default getFavoriteCharacters
