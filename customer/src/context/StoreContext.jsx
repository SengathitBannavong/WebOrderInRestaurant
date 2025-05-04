import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "./unit_context/foodcontext.jsx";
import {
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
} from "./unit_context/cartcontext.jsx";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url  = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function loadData() {
            const food_list = await fetchFoodList(url);
            if (food_list) {
                setFoodList(food_list);
            }

            const savedCartItems = localStorage.getItem("cartItems");
            if (savedCartItems) {
                setCartItems(JSON.parse(savedCartItems)); // Parse the string back to an object
            } else {
                setCartItems({}); // Initialize with empty object, not string
                console.log("No items in cart");
            }
        }
        loadData();
    }, []);

    const contextValue = {
        // Data
        food_list,
        url,
        cartItems,

        // Fuctions
        addToCart: (id) => addToCart(cartItems, setCartItems, id),
        removeFromCart: (id) => removeFromCart(cartItems, setCartItems, id),
        clearCart: () => clearCart(setCartItems),
        getTotalCartAmount: () => getTotalCartAmount(cartItems, food_list),
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;