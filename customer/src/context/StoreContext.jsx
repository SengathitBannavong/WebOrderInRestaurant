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
    fetchOrderById
} from "./unit_context/ordercontext.jsx";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url  = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]); 
    const [cartItems, setCartItems] = useState({});
    const id = "680b3f65275b19c8f712d432"; // Dummy id, replace with actual user id
    const [table, setTable] = useState({}); 
    const [token, setToken] = useState(id); // Dummy id, replace with actual user id // Token should encrypt by JWT

    useEffect(() => {
        async function loadData() {
            const food_list = await fetchFoodList(url);
            if (food_list) {
                setFoodList(food_list);
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
            }else {
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

        // Fuctions
        addToCart: (id) => addToCart(cartItems, setCartItems, id),
        removeFromCart: (id) => removeFromCart(cartItems, setCartItems, id),
        clearCart: () => clearCart(setCartItems),
        getTotalCartAmount: () => getTotalCartAmount(cartItems, food_list),
        fetchOrders: () => fetchOrders(url),
        setToken: (token) => setToken(token),
        fetchOrderById: (id) => fetchOrderById(url, id),
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;