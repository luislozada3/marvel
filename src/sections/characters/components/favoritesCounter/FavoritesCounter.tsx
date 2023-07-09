import { useContext } from 'react'

import { Character } from '../../../../modules/characters/domain/Character'
import { MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS } from '../../../../modules/characters/domain/CharactersFavorites'

import ContextCharacters from '../../context/CharacterContext'

import HighlightedText from '../../../shared/components/HighlightedText/HighlightedText'

const FavoritesCounter = () => {
  const { favorites } = useContext(ContextCharacters)

  return (
    <HighlightedText
      tooltip={favorites.map((favorite: Character) => favorite.name).join(', ')}
    >
      {`favorites: ${favorites.length} / ${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS}`}
    </HighlightedText>
  )
}
export default FavoritesCounter
