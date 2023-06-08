import React, { useContext } from 'react'

import './character-card.css'

import { Character } from '../../../../modules/characters/domain/Character'

import {
  canYouAddMoreFavouriteCharacters,
  characterIsAlreadyAddedInFavorite
} from '../../../../modules/characters/domain/CharactersFavorites'

import ContextCharacters from '../../context/CharacterContext'

import useAddToFavorite from '../../hooks/useAddToFavorite'
import useRemoveFavorite from '../../hooks/useRemoveFavorite'

interface CharacterCardProps {
  character: Character
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const context = useContext(ContextCharacters)
  const { AddToFavorite } = useAddToFavorite()
  const { removeFavorite } = useRemoveFavorite()

  const isFavorite = () => characterIsAlreadyAddedInFavorite(context.favorites, character)
  const canAddMoreFavorites = () => canYouAddMoreFavouriteCharacters(context.favorites.length)

  return (
    <div className="character-card">
      <div className="character-card__header">
        {
          isFavorite()
            ? (
                <i
                  className="character-card__favorite-icon"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => {
                    await removeFavorite(character.id)
                  }}
                  title='remove favorite'
                >
                  &#11088;
                </i>
              )
            : null
          }
        <img
          src={character.thumbnail}
          alt={character.name}
          className="character-card__img"
        />
      </div>
      <div className="character-card__body">
        <a className="character-card__name" href={character.thumbnail} target='__blank'>{character.name}</a>
        <div className='character-card__buttons'>
          <button
            className='btn'
            type="button"
            disabled={isFavorite() || !canAddMoreFavorites()}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await AddToFavorite(character)
            }}
          >
            Add to favorite
          </button>

          <button
            className='btn'
            type="button"
            disabled={!isFavorite()}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await removeFavorite(character.id)
            }}
          >
            Remove favorite
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CharacterCard)
