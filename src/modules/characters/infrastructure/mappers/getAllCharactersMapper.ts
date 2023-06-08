import { Character } from '../../domain/Character'
import { CharacterDTO } from '../DTO/CharacterDTO'

export const getAllCharactersMappers = (characterDTO: CharacterDTO): Character => {
  const { id, name } = characterDTO
  const thumbnail = `${characterDTO.thumbnail.path}.${characterDTO.thumbnail.extension}`

  return {
    id,
    name,
    thumbnail
  }
}
