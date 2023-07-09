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
  describe('Prueba de character card cuando son favoritas', () => {
    beforeEach(() => {
      render(<CharacterCard { ...cardProps } />)
      jest.clearAllMocks()
    })

    it('debe mostar una imagen', async () => {
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', cardProps.character.thumbnail)
      expect(img).toHaveAttribute('alt', cardProps.character.name)
    })

    it('verificar que este deshabilitado el boton de agregar si es favorito', async () => {
      const ButtonAddToFavorite = screen.getByRole('button', { name: 'Add to favorite' })
      expect(ButtonAddToFavorite).toBeDisabled()

      await userEvent.click(ButtonAddToFavorite)

      expect(mockFnAddToFavorite).not.toBeCalled()
    })

    it('verificar que el boton de remover de favoritos este habilitado y que funcione', async () => {
      const ButtonRemoveFavorite = screen.getByRole('button', { name: 'Remove favorite' })
      expect(ButtonRemoveFavorite).not.toBeDisabled()

      await userEvent.click(ButtonRemoveFavorite)

      expect(mockFnRemoveFavorite).toBeCalled()
    })

    it('debe mostrar la estrella si es favorito', async () => {
      const starIcon = screen.getByText('⭐')
      expect(starIcon).toBeInTheDocument()

      await userEvent.click(starIcon)
      expect(mockFnRemoveFavorite).toBeCalled()
    })
  })

  describe('Prueba de character card cuando no son favoritas', () => {
    beforeEach(() => {
      render(<CharacterCard { ...cardProps } isFavorite={false} />)
      jest.clearAllMocks()
    })

    it('no debe mostrar la estrella si no es favorito', async () => {
      const starIcon = screen.queryByText('⭐')
      expect(starIcon).toBeNull()
    })

    it('Debe mostrar el nombre del personaje', async () => {
      const labelCharacterName = screen.getByRole('link', { name: cardProps.character.name })

      expect(labelCharacterName).toBeInTheDocument()
      expect(labelCharacterName).toHaveAttribute('href', cardProps.character.thumbnail)
    })

    it('verificar que este habilitado el boton de agregar si no es favorito y que funcione', async () => {
      const ButtonAddToFavorite = screen.getByRole('button', { name: 'Add to favorite' })
      expect(ButtonAddToFavorite).not.toBeDisabled()

      await userEvent.click(ButtonAddToFavorite)

      expect(mockFnAddToFavorite).toBeCalled()
    })

    it('verificar que el boton de remover de favoritos este deshabilitado y que no funcione cuando no es favorito', async () => {
      const ButtonRemoveFavorite = screen.getByRole('button', { name: 'Remove favorite' })
      expect(ButtonRemoveFavorite).toBeDisabled()

      await userEvent.click(ButtonRemoveFavorite)

      expect(mockFnRemoveFavorite).not.toBeCalled()
    })
  })
})
