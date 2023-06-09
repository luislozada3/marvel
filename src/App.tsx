import { CharactersContextProvider } from './sections/characters/context/CharacterContext'
import Characters from './sections/characters/pages/characters/Characters'

function App () {
  return (
    <>
      <CharactersContextProvider>
        <Characters />
      </CharactersContextProvider>
    </>
  )
}

export default App
