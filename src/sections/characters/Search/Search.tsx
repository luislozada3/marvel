import { useState, useContext } from 'react'

import './search.css'

import getByName from '../../../modules/characters/application/get/getByName'

import FetchCharacterRepository from '../../../modules/characters/infrastructure/FetchCharacterRepository'

import ContextCharacters from '../context/CharacterContext'

import Button from '../../shared/components/Button/Button'

const Search = () => {
  const { setLoading, setCharacters, setError, loading } = useContext(ContextCharacters)
  const [name, setName] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const charactersByName = await getByName(FetchCharacterRepository, name.trim())
      setCharacters(charactersByName)
    } catch (error) {
      setError('ooopssss.... ha ocurrido un error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-search'>
      <input
        type="search"
        name='name'
        value={name}
        onChange={(e) => {
          const value = e.target.value
          setName(value)
        }}
        className='form-search__input'
        placeholder='search by character name...'
      />
      <Button type="submit" disabled={loading}>search</Button>
    </form>
  )
}
export default Search
