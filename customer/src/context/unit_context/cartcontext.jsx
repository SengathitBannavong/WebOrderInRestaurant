export const addToCart = (cartItems, setCartItems, itemId) => {
    const updatedCart = {
        ...cartItems,
        [itemId]: (cartItems[itemId] || 0) + 1,
    };
    console.log("Updated cart:", updatedCart);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

export const removeFromCart = (cartItems, setCartItems, itemId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
    } else {
        delete updatedCart[itemId];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

export const clearCart = (setCartItems) => {
    setCartItems({});
    localStorage.removeItem("cartItems");
};

export const getTotalCartAmount = (cartItems, food_list) => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find((product) => product._id === item);
            if (!itemInfo) continue;
            totalAmount += itemInfo.price * cartItems[item];
        }
    }
    return totalAmount;
};
