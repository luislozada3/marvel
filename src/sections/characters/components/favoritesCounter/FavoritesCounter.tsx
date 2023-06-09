import { useContext } from 'react'

import {
  CharactersFavorites,
  MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS
} from '../../../../modules/characters/domain/CharactersFavorites'

import ContextCharacters from '../../context/CharacterContext'

import HighlightedText from '../../../shared/components/HighlightedText/HighlightedText'

const FavoritesCounter = () => {
  const context: any = useContext(ContextCharacters)
  const favorites = context.favorites as CharactersFavorites

  return (
    <HighlightedText
      tooltip={favorites.map((favorite) => favorite.name).join(', ')}
    >
      {`favorites: ${favorites.length} / ${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS}`}
    </HighlightedText>
  )
}
export default FavoritesCounter
