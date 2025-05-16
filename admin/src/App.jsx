import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useContext } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import Sidebar from './components/SlideBar/slidebar.jsx'
import AddFood from './pages/AddFood.jsx'
import Home from './pages/Home.jsx'
import ListFood from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import PromoCodeAdmin from './components/PromoCode/promocode.jsx'
import Feedback from './pages/Feedback.jsx'

import { StoreContext } from './context/StoreContext.jsx'

function App() {
  const {url} = useContext(StoreContext);
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
              <Route path='/addfood' element = {<AddFood url={url}/>} />
              <Route path='/list' element = {<ListFood url={url}/>} />
              <Route path='/orders' element = {<Orders/>} />
              <Route path='/feedback' element = {<Feedback url={url}/>} />
              <Route path='/promocode' element={<PromoCodeAdmin url={url} />} />
            </Routes>
        </div>
      </div>
    </>
  )
}

export default App
