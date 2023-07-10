import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { mockFavoritesCharactersEmpty, mockFavoritesCharacters } from '../__mocks__/mockFavoritesCharacter'

import { MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS } from '../modules/characters/domain/CharactersFavorites'
import FetchCharacterRepository from '../modules/characters/infrastructure/FetchCharacterRepository'

import { CharactersContextProvider } from '../sections/characters/context/CharacterContext'

import FavoritesCounter from '../sections/characters/components/favoritesCounter/FavoritesCounter'

const getFavoritesSpy = jest.spyOn(FetchCharacterRepository, 'getFavorites')

const renderFavoritesCounter = () => {
  act(() => {
    render(
    <CharactersContextProvider>
      <FavoritesCounter />
    </CharactersContextProvider>
    )
  })
}

describe('favoritesCounter', () => {
  it('should show favorites: 0 / 5 when no favorites have been added', () => {
    getFavoritesSpy.mockResolvedValue(mockFavoritesCharactersEmpty)
    renderFavoritesCounter()

    const favoriteCounterText = screen.getByText(`favorites: ${mockFavoritesCharactersEmpty.length} / ${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS}`)
    expect(favoriteCounterText).toBeInTheDocument()
  })

  it('must show favorites: 2 / 5 when there are added favorites', async () => {
    jest.resetAllMocks()
    getFavoritesSpy.mockResolvedValue(mockFavoritesCharacters)
    renderFavoritesCounter()

    const favoriteCounterText = await screen.findByText(`favorites: ${mockFavoritesCharacters.length} / ${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS}`)
    expect(favoriteCounterText).toBeInTheDocument()
  })

  it('should display a text as title when a user hover ', async () => {
    renderFavoritesCounter()
    const textTitleCounter = mockFavoritesCharacters.map(favorite => favorite.name).join(', ')
    const counter = await screen.findByText(`favorites: ${mockFavoritesCharacters.length} / ${MAXIMUM_NUMBER_OF_FAVORITE_CHARACTERS}`)
    expect(counter).toHaveAttribute('title', textTitleCounter)
  })
})
