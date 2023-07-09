import { useState, useContext } from 'react'

import removeFavoriteCharacter from '../../../modules/characters/application/remove/removeFavoriteCharacter'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

import ContextCharacters from '../context/CharacterContext'

const useRemoveFavorite = () => {
  const { setFavorites } = useContext(ContextCharacters)
  const [loading, setLoading] = useState<boolean>(false)

  const removeFavorite = async (characterId: number) => {
    setLoading(true)
    try {
      await removeFavoriteCharacter(FetchCharacterRepository, characterId)
      const localStorageFavorites = localStorage.getItem('favoriteCharacters')
      const favorites = JSON.parse(localStorageFavorites ?? '[]')
      setFavorites?.(favorites)
      alert('the character is no longer favorite')
    } catch (e: any) {
      alert('error when trying to remove a favorite character')
    } finally {
      setLoading(false)
    }
  }

  return {
    removeFavorite,
    loading
  }
}

export default useRemoveFavorite
