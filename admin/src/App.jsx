import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useContext } from 'react'
import Dashboard_Feedback from './components/DashBoard/Feedback/D_feedback.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import PromoCodeAdmin from './components/PromoCode/promocode.jsx'
import Sidebar from './components/SlideBar/slidebar.jsx'
import AddFood from './pages/AddFood.jsx'
import Feedback from './pages/Feedback.jsx'
import Home from './pages/Home.jsx'
import ListFood from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import TableManage from './pages/TableManage/TableManage.jsx'

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
              <Route path='/' element = {<Home url={url}/>} />
              <Route path='/addfood' element = {<AddFood url={url}/>} />
              <Route path='/list' element = {<ListFood url={url}/>} />
              <Route path='/orders' element = {<Orders url={url}/>} />
              <Route path='/feedback' element = {<Feedback url={url}/>} />
              <Route path='/promocode' element={<PromoCodeAdmin url={url} />} />
              <Route path='/feedback-dashboard' element={<Dashboard_Feedback url={url} />} />
              <Route path='/table-manage' element={<TableManage url={url} />} />
            </Routes>
        </div>
      </div>
    </>
  )
}

export default App
