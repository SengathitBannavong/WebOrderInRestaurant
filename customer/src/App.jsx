import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/Footer/footer.jsx';
import Home from './pages/Home/home.jsx';
import Cart from './pages/Cart/cart.jsx';
import Order from './pages/Order/order.jsx';
import MyOrders from './pages/MyOrders/myorders.jsx';
import Account from "./pages/Account/account.jsx";
import Login from './pages/Login/login.jsx';
import Register from './pages/Register/register.jsx';

function App () {
  const [token, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  useEffect(() => {
    // Update navbar or other components when authentication changes
    // This helps components that need to know auth status without prop drilling
  }, [token, user]);

  // Function to handle logout from anywhere in the app
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <div className="app">
        <ToastContainer/>
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} setUser={setUser} />} />
          <Route path="/register" element={<Register setAuthToken={setAuthToken} setUser={setUser} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;