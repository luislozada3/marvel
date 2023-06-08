import { createContext, useState } from 'react'

import { Character } from '../../../modules/characters/domain/Character'
import { CharactersFavorites } from '../../../modules/characters/domain/CharactersFavorites'

const ContextCharacters = createContext<any>({})

interface CharactersContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

const localstorageFavorite = localStorage.getItem('favoriteCharacters') ?? '[]'
const INITIAL_FAVORITES = JSON.parse(localstorageFavorite)

export const CharactersContextProvider = ({ children }: CharactersContextProviderProps) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [favorites, setFavorites] = useState<CharactersFavorites>(INITIAL_FAVORITES)

  return (
    <ContextCharacters.Provider value={{
      characters,
      setCharacters,
      favorites,
      setFavorites
    }}>
      {children}
    </ContextCharacters.Provider>
  )
}

export default ContextCharacters
