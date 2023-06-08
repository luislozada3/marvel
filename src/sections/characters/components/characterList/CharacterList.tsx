import { useContext } from 'react'

import './character-list.css'

import { Character } from '../../../../modules/characters/domain/Character'

import ContextCharacters from '../../context/CharacterContext'

import CharacterCard from '../characterCard/CharacterCard'

import useCharacters from '../../hooks/useCharacters'

const CharacterList = () => {
  const { loading, error } = useCharacters()
  const { characters } = useContext(ContextCharacters)

  if (loading) {
    return <div style={{ color: '#ffffff' }}>loading...</div>
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>
  }

  return (
    <div className='character-grid'>
      {characters.map((character: Character) => {
        return <CharacterCard character={character} key={character.id} />
      })}
    </div>
  )
}

export default CharacterList
