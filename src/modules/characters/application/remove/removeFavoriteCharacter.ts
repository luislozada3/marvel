import { CharacterRepository } from '../../domain/CharacterRepository'

const removeFavoriteCharacter = async (characterRepository: CharacterRepository, characterId: number) => {
  await characterRepository.deleteFavorite(characterId)
}

export default removeFavoriteCharacter
