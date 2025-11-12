import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CharacterList from './Component/StarWars/CharacterList.jsx'
import CharacterCard from './Component/StarWars/CharacterCard.jsx'
import CharacterModal from './Component/StarWars/CharacterModal.jsx'
import StarWars from './Component/StarWars/starwar.jsx'


 const App = () => {
  return (

    <Routes>
       <Route path="/" element={<StarWars />} />
        <Route path='/starwars' element={<StarWars />} />
      <Route path='/characters' element={<CharacterList />} />
      <Route path='/characters/:id' element={<CharacterCard />} />
      <Route path='/charactersmodal' element={<CharacterModal />} />
    


    </Routes>

  )
}

export default App
