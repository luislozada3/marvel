import React from 'react'

import './character-card.css'

import { Character } from '../../../../modules/characters/domain/Character'

import useAddToFavorite from '../../hooks/useAddToFavorite'
import useRemoveFavorite from '../../hooks/useRemoveFavorite'

interface CharacterCardProps {
  character: Character
  isFavorite: boolean
  canAddMoreFavorites: boolean
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isFavorite, canAddMoreFavorites }) => {
  const { AddToFavorite } = useAddToFavorite()
  const { removeFavorite } = useRemoveFavorite()

  return (
    <div className="character-card">
      <div className="character-card__header">
        {
          isFavorite
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
            disabled={isFavorite || !canAddMoreFavorites}
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
            disabled={!isFavorite}
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
