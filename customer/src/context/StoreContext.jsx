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

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url  = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]); 
    const [cartItems, setCartItems] = useState({});
    const [table, setTable] = useState({}); 

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