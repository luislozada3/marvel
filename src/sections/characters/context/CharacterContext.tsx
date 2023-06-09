import { createContext, useState, useEffect } from 'react'

import { Character } from '../../../modules/characters/domain/Character'
import { CharactersFavorites } from '../../../modules/characters/domain/CharactersFavorites'

import getAllCharacters from '../../../modules/characters/application/getAll/getAllCharacters'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

const ContextCharacters = createContext<any>({})

interface CharactersContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

const localstorageFavorite = localStorage.getItem('favoriteCharacters') ?? '[]'
const INITIAL_FAVORITES = JSON.parse(localstorageFavorite)

export const CharactersContextProvider = ({ children }: CharactersContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [characters, setCharacters] = useState<Character[]>([])
  const [favorites, setFavorites] = useState<CharactersFavorites>(INITIAL_FAVORITES)

  const getData = async () => {
    try {
      const data = await getAllCharacters(FetchCharacterRepository)
      setCharacters(data)
    } catch {
      setError('ooopssss.... ha ocurrido un error')
    } finally {
      console.log('prueba')
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
