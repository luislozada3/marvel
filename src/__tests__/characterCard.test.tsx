import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCard from '../sections/characters/components/characterCard/CharacterCard'

const mockFnAddToFavorite = jest.fn()
const mockFnRemoveFavorite = jest.fn()

jest.mock('../sections/characters/hooks/useAddToFavorite', () => {
  return jest.fn(() => ({
    AddToFavorite: mockFnAddToFavorite
  }))
})

jest.mock('../sections/characters/hooks/useRemoveFavorite', () => {
  return jest.fn(() => ({
    removeFavorite: mockFnRemoveFavorite
  }))
})

const cardProps = {
  character: {
    id: 1,
    name: 'nombre',
    thumbnail: 'image.jpg'
  },
  isFavorite: true,
  canAddMoreFavorites: true
}

describe('characterCard', () => {
  describe('character card when they are favorites', () => {
    beforeEach(() => {
      render(<CharacterCard { ...cardProps } />)
      jest.clearAllMocks()
    })

    it('must show an image', async () => {
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', cardProps.character.thumbnail)
      expect(img).toHaveAttribute('alt', cardProps.character.name)
    })

    it('verify that the add button is disabled if it is a favorite', async () => {
      const ButtonAddToFavorite = screen.getByRole('button', { name: 'Add to favorite' })
      expect(ButtonAddToFavorite).toBeDisabled()

      await userEvent.click(ButtonAddToFavorite)

      expect(mockFnAddToFavorite).not.toBeCalled()
    })

    it('verify that the remove from favorites button is enabled and working', async () => {
      const ButtonRemoveFavorite = screen.getByRole('button', { name: 'Remove favorite' })
      expect(ButtonRemoveFavorite).not.toBeDisabled()

      await userEvent.click(ButtonRemoveFavorite)

      expect(mockFnRemoveFavorite).toBeCalled()
    })

    it('must display the star if favored', async () => {
      const starIcon = screen.getByText('⭐')
      expect(starIcon).toBeInTheDocument()

      await userEvent.click(starIcon)
      expect(mockFnRemoveFavorite).toBeCalled()
    })
  })

  describe('Character card test when they are not favorites', () => {
    beforeEach(() => {
      render(<CharacterCard { ...cardProps } isFavorite={false} />)
      jest.clearAllMocks()
    })

    it('should not display the star if it is not a favorite', async () => {
      const starIcon = screen.queryByText('⭐')
      expect(starIcon).toBeNull()
    })

    it("Must display the character's name", async () => {
      const labelCharacterName = screen.getByRole('link', { name: cardProps.character.name })

      expect(labelCharacterName).toBeInTheDocument()
      expect(labelCharacterName).toHaveAttribute('href', cardProps.character.thumbnail)
    })

    it('verify that the add button is enabled if it is not a favorite and that it works', async () => {
      const ButtonAddToFavorite = screen.getByRole('button', { name: 'Add to favorite' })
      expect(ButtonAddToFavorite).not.toBeDisabled()

      await userEvent.click(ButtonAddToFavorite)

      expect(mockFnAddToFavorite).toBeCalled()
    })

    it('verify that the remove from favorites button is disabled and that it does not work when it is not a favorite.', async () => {
      const ButtonRemoveFavorite = screen.getByRole('button', { name: 'Remove favorite' })
      expect(ButtonRemoveFavorite).toBeDisabled()

      await userEvent.click(ButtonRemoveFavorite)

      expect(mockFnRemoveFavorite).not.toBeCalled()
    })
  })
})
