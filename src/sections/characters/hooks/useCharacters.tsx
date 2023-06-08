import { useContext, useEffect, useState } from 'react'

import getAllCharacters from '../../../modules/characters/application/getAll/getAllCharacters'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

import ContextCharacters from '../context/CharacterContext'

const useCharacters = () => {
  const context = useContext(ContextCharacters)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const getData = async () => {
    try {
      const data = await getAllCharacters(FetchCharacterRepository)
      context.setCharacters(data)
    } catch {
      setError('ooopssss.... ha ocurrido un error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getData()
  }, [])

  return {
    loading,
    error
  }
}

export default useCharacters
