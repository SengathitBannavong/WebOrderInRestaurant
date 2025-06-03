import { createContext, useEffect, useState } from "react";
import {
    addToCart,
    clearCart,
    getTotalCartAmount,
    removeFromCart,
} from "./unit_context/cartcontext.jsx";
import {
    fetchTableList,
} from "./unit_context/tablecontext.jsx";
import { 
    fetchFoodList 
} from "./unit_context/foodcontext.jsx";
import {
    fetchOrders,
    fetchOrderById,
    removeOrderById
} from "./unit_context/ordercontext.jsx";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // ✅ Backend URL from config
    const url = "http://localhost:4000";
    
    // ✅ State management with real token
    const [food_list, setFoodList] = useState([]); 
    const [cartItems, setCartItems] = useState({});
    const [table, setTable] = useState({}); 
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
            setUser(null);
            setCartItems({});
        }
    };

    useEffect(() => {
        async function loadData() {
            // ✅ Load food list
            const food_list = await fetchFoodList(url);
            if (food_list) {
                setFoodList(food_list);
            }

            // ✅ Check token in localStorage
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
            }else{
                console.log("No token found, please login");
            }

            const savedCartItems = localStorage.getItem("cartItems");
            if (savedCartItems) {
                setCartItems(JSON.parse(savedCartItems));
            } else {
                setCartItems({});
                console.log("No items in cart");
            }
        }

        async function loadTable() {
            const table_list = await fetchTableList(url);
            if (table_list) {
                setTable(table_list);
            } else {
                console.log("Error fetching table list");
            }
        }

        loadTable();
        loadData();
    }, []);

    const contextValue = {
        // Data
        food_list,
        url,
        cartItems,
        table,
        token,
        user, // ✅ Add user data

        // Functions
        addToCart: (id) => addToCart(cartItems, setCartItems, id),
        removeFromCart: (id) => removeFromCart(cartItems, setCartItems, id),
        clearCart: () => clearCart(setCartItems),
        getTotalCartAmount: () => getTotalCartAmount(cartItems, food_list),
        fetchOrders: () => fetchOrders(url),
        setToken: updateToken,
        fetchOrderById: (id) => fetchOrderById(url, id),
        removeOrderById: (id) => removeOrderById(url, id),
        loadUserData: () => loadUserData(token),
        loadCartData: () => loadCartData(token),
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;