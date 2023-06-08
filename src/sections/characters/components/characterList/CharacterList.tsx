import { useContext } from 'react'

import './character-list.css'

import { Character } from '../../../../modules/characters/domain/Character'

import ContextCharacters from '../../context/CharacterContext'

import CharacterCard from '../characterCard/CharacterCard'

import useCharacters from '../../hooks/useCharacters'
import {
  canYouAddMoreFavouriteCharacters,
  characterIsAlreadyAddedInFavorite
} from '../../../../modules/characters/domain/CharactersFavorites'

const CharacterList = () => {
  const { loading, error } = useCharacters()
  const { characters, favorites } = useContext(ContextCharacters)

  const canAddMoreFavorites = canYouAddMoreFavouriteCharacters(
    favorites.length
  )

  if (loading) {
    return <div style={{ color: '#ffffff' }}>loading...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>
  }

  return (
    <div className="character-grid">
      {characters.map((character: Character) => {
        const isFavorite = characterIsAlreadyAddedInFavorite(
          favorites,
          character
        )
        return (
          <CharacterCard
            character={character}
            isFavorite={isFavorite}
            key={character.id}
            canAddMoreFavorites={canAddMoreFavorites}
          />
        )
      })}
    </div>
  )
}

export default CharacterList
