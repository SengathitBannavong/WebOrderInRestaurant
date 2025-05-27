import { createContext, useEffect, useState } from "react";
import axios from "axios";
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

    // ✅ Load cart data from backend when user logs in
    const loadCartData = async (userToken) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { token: userToken }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // ✅ Load user data from backend
    const loadUserData = async (userToken) => {
        try {
            const response = await axios.post(url + "/api/user/profile", {}, {
                headers: { token: userToken }
            });
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    // ✅ Custom setToken function with data loading
    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
            // Load user data and cart data when setting token
            loadUserData(newToken);
            loadCartData(newToken);
        } else {
            localStorage.removeItem("token");
            setUser(null);
            setCartItems({});
        }
    };

    // ✅ Enhanced clearCart function
    const clearCartData = async () => {
        setCartItems({});
        localStorage.removeItem("cartItems");
        
        // If user is logged in, clear cart in backend
        if (token) {
            try {
                await axios.post(url + "/api/cart/clear", {}, {
                    headers: { token }
                });
            } catch (error) {
                console.error("Error clearing cart in backend:", error);
            }
        }
    };

    // ✅ Enhanced addToCart with backend sync
    const addToCartEnhanced = async (itemId) => {
        // Update local state
        addToCart(cartItems, setCartItems, itemId);
        
        // Sync with backend if user is logged in
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: { token }
                });
            } catch (error) {
                console.error("Error syncing cart to backend:", error);
            }
        } else {
            // Save to localStorage if not logged in
            const updatedCart = { ...cartItems };
            updatedCart[itemId] = updatedCart[itemId] ? updatedCart[itemId] + 1 : 1;
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }
    };

    // ✅ Enhanced removeFromCart with backend sync
    const removeFromCartEnhanced = async (itemId) => {
        // Update local state
        removeFromCart(cartItems, setCartItems, itemId);
        
        // Sync with backend if user is logged in
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, {
                    headers: { token }
                });
            } catch (error) {
                console.error("Error syncing cart to backend:", error);
            }
        } else {
            // Update localStorage if not logged in
            const updatedCart = { ...cartItems };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
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
                // Load user data and cart data
                await loadUserData(savedToken);
                await loadCartData(savedToken);
            } else {
                // Load cart from localStorage if not logged in
                const savedCartItems = localStorage.getItem("cartItems");
                if (savedCartItems) {
                    setCartItems(JSON.parse(savedCartItems));
                } else {
                    setCartItems({});
                }
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
        addToCart: addToCartEnhanced,
        removeFromCart: removeFromCartEnhanced,
        clearCart: clearCartData,
        getTotalCartAmount: () => getTotalCartAmount(cartItems, food_list),
        fetchOrders: () => fetchOrders(url),
        setToken: updateToken, // ✅ Use enhanced setToken
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