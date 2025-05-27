import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/Footer/footer.jsx';
import Home from './pages/Home/home.jsx';
import Cart from './pages/Cart/cart.jsx';
import Order from './pages/Order/order.jsx';
import MyOrders from './pages/MyOrders/myorders.jsx';
import Account from "./pages/Account/account.jsx";
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import Logout from "./pages/Logout/Logout.jsx";
function App() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <ToastContainer/>
         <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/account" element={<Account/>} />
           <Route path="/logout" element={<Logout/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;