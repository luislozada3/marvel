import { useContext } from 'react'

import './character-list.css'

import { Character } from '../../../../modules/characters/domain/Character'

import ContextCharacters from '../../context/CharacterContext'

import CharacterCard from '../characterCard/CharacterCard'

import NotificationMessage from '../../../shared/components/NotificationMessage/NotificationMessage'

import {
  canYouAddMoreFavouriteCharacters,
  characterIsAlreadyAddedInFavorite
} from '../../../../modules/characters/domain/CharactersFavorites'

const CharacterList = () => {
  const { characters, favorites, loading, error } = useContext(ContextCharacters)

  if (loading) return <NotificationMessage type='info' message={'loading...'} />

  if (error) return <NotificationMessage type='danger' message={error} />

  if (!characters || characters.length === 0) return <NotificationMessage type='info' message={'results not found...'} />

  const canAddMoreFavorites = canYouAddMoreFavouriteCharacters(favorites.length)

  return (
    <div className="character-grid">
      {characters.map((character: Character) => {
        const isFavorite = characterIsAlreadyAddedInFavorite(favorites, character)
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
