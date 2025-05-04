import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/Footer/footer.jsx';
import Home from './pages/Home/home.jsx';
import Cart from './pages/Cart/cart.jsx';
import Order from './pages/Order/order.jsx';
import MyOrders from './pages/MyOrders/myorders.jsx';
import Account from "./pages/Account/account.jsx";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/account" element={<Account/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;