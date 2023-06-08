import React from 'react'

import CharacterList from '../../components/characterList/CharacterList'

import { CharactersContextProvider } from '../../context/CharacterContext'

import './character.css'
import Wrapper from '../../../shared/components/Wrapper/Wrapper'

const Characters: React.FC = () => {
  return (
    <Wrapper>
      <CharactersContextProvider>
        <h1 className='character__title'>Characters</h1>
        <CharacterList />
      </CharactersContextProvider>
    </Wrapper>
  )
}

export default Characters
