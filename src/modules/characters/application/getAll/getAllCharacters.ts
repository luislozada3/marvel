import { CharacterRepository } from '../../domain/CharacterRepository'

const getAllCharacters = async (characterRepository: CharacterRepository) => {
  const characters = await characterRepository.getAll()

  return characters
}

export default getAllCharacters
