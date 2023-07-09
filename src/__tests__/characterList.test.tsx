import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import CharacterList from '../sections/characters/components/characterList/CharacterList'
import { CharactersContextProvider } from '../sections/characters/context/CharacterContext'

import { mockCharacters, mockCharactersEmpty } from '../__mocks__/mockCharacters'
import { mockFavoritesCharactersEmpty } from '../__mocks__/mockFavoritesCharacter'

jest.mock('../modules/characters/infrastructure/FetchCharacterRepository', () => ({
  getAll: jest.fn(async () => {
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCharacters)
      }, 100)
    })
    return await response
  }),
  getFavorites: jest.fn(async () => {
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFavoritesCharactersEmpty)
      }, 100)
    })

    return await response
  })
}))

const renderCharacterList = () => {
  act(() => {
    render(
      <CharactersContextProvider>
        <CharacterList />
      </CharactersContextProvider>
    )
  })
}

describe('CharacterList', () => {
  describe('when the list starts', () => {
    it('should display a text that says loading when waiting for data', async () => {
      renderCharacterList()
      const loadingText = screen.getByText('loading...')
      expect(loadingText).toBeInTheDocument()
    })

    it('deberia mostrar 2 personajes cuando cargan los datos', async () => {
      renderCharacterList()
      const buttonsAddToFavoritescharacters = await screen.findAllByRole('img')
      expect(buttonsAddToFavoritescharacters).toHaveLength(2)
    })

    it('deberia mostrar results not found... cuando no hay personajes que mostrar', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('../modules/characters/infrastructure/FetchCharacterRepository'), 'getAll').mockResolvedValue(mockCharactersEmpty)
      renderCharacterList()
      const errorText = await screen.findByText('results not found...')
      expect(errorText).toBeInTheDocument()
    })

    it('deberia mostrar un mensaje de error cuando no carga correctamente la lista', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('../modules/characters/infrastructure/FetchCharacterRepository'), 'getAll').mockImplementation(jest.fn(() => {
        throw new Error('error')
      }))
      renderCharacterList()
      const errorText = await screen.findByText('ooopssss.... an error has occurred')
      expect(errorText).toBeInTheDocument()
    })
  })
})
