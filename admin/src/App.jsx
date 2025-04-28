import { ToastContainer } from 'react-toastify' 
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import AddFood from './pages/AddFood.jsx'
import ListFood from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import Sidebar from './components/SlideBar/slidebar.jsx'

function App() {
  return (
    <>
      <div>
      <ToastContainer/>
        <Navbar/>
        <hr/>
        <div className='app-content'>
          <Sidebar/>
            <Routes>
              <Route path='/' element = {<Home/>} />
              <Route path='/addfood' element = {<AddFood/>} />
              <Route path='/list' element = {<ListFood/>} />
              <Route path='/orders' element = {<Orders/>} />
            </Routes>
        </div>
      </div>
    </>
  )
}

export default App
