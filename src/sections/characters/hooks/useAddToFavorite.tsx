import { useState, useContext } from 'react'

import { Character } from '../../../modules/characters/domain/Character'

import addToFavorite from '../../../modules/characters/application/add/addToFavorite'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

import ContextCharacters from '../context/CharacterContext'

const useAddToFavorite = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const context = useContext(ContextCharacters)

  const AddToFavorite = async (character: Character) => {
    setLoading(true)
    try {
      await addToFavorite(FetchCharacterRepository, character)
      const localStorageFavorites = localStorage.getItem('favoriteCharacters')
      const favorites = JSON.parse(localStorageFavorites ?? '[]')
      context.setFavorites(favorites)
      alert('character added')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    AddToFavorite,
    loading
  }
}

export default useAddToFavorite
