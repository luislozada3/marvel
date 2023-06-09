import React, { createContext, useState, useEffect } from 'react'

import { Character } from '../../../modules/characters/domain/Character'
import { CharactersFavorites } from '../../../modules/characters/domain/CharactersFavorites'

import getAllCharacters from '../../../modules/characters/application/getAll/getAllCharacters'
import getFavoriteCharacters from '../../../modules/characters/application/get/getFavoriteCharacters'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

interface IContextCharacters {
  loading: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  error: string
  setError?: React.Dispatch<React.SetStateAction<string>>
  characters: Character[]
  setCharacters?: React.Dispatch<React.SetStateAction<Character[]>>
  favorites: CharactersFavorites
  setFavorites?: React.Dispatch<React.SetStateAction<CharactersFavorites>>
}

const ContextCharacters = createContext<IContextCharacters>({
  loading: false,
  error: '',
  characters: [],
  favorites: []
})

interface CharactersContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const CharactersContextProvider: React.FC<CharactersContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [characters, setCharacters] = useState<Character[]>([])
  const [favorites, setFavorites] = useState<CharactersFavorites>([])

  const getData = async () => {
    try {
      const favorites = await getFavoriteCharacters(FetchCharacterRepository)
      setFavorites(favorites)
      const data = await getAllCharacters(FetchCharacterRepository)
      setCharacters(data)
    } catch {
      setError('ooopssss.... an error has occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getData()
  }, [])

  return (
    <ContextCharacters.Provider value={{
      characters,
      setCharacters,
      favorites,
      setFavorites,
      loading,
      setLoading,
      error,
      setError
    }}>
      {children}
    </ContextCharacters.Provider>
  )
}

export default ContextCharacters
