import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Item } from './components/item.tsx'
import { Pokemon } from './components/pokemon'
import { Navbar } from './components/navbar'

function App() {

  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/pokemon" element={<Pokemon />} />
              <Route path="/item" element={<Item />} />
          </Routes>
      </Router>
  )

}

export default App
