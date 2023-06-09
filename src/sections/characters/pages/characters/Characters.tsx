import React from 'react'

import './character.css'

import Wrapper from '../../../shared/components/Wrapper/Wrapper'
import Search from '../../Search/Search'
import FavoritesCounter from '../../components/favoritesCounter/FavoritesCounter'
import CharacterList from '../../components/characterList/CharacterList'

const Characters: React.FC = () => {
  return (
    <Wrapper>
      <div className='character'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className='character__title'>Characters</h1>
          <FavoritesCounter />
        </div>
        <Search />
        <CharacterList />
      </div>
    </Wrapper>
  )
}

export default Characters
