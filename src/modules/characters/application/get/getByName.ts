import { CharacterRepository } from '../../domain/CharacterRepository'

const getByName = async (characterRepository: CharacterRepository, name: string) => {
  const charactersByName = await characterRepository.getByName(name)
  return charactersByName
}

export default getByName
