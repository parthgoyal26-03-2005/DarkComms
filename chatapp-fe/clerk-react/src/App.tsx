import './App.scss'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Homepage } from './Components/Homepage'
import { Chatrooms } from './Components/Chatrooms'
import { Allrooms } from './Components/room/Allrooms'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes> 
      <Route path='/' element={<Homepage/>} />
      <Route path='/chat-room' element={<Chatrooms/>} />
      <Route path='/room/:id' element={<Allrooms/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
