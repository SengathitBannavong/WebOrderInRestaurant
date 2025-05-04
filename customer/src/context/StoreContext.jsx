import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "./unit_context/foodcontext.jsx";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url  = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);


    useEffect(() => {
        async function loadData() {
            const food_list = await fetchFoodList(url);
            if (food_list) {
                setFoodList(food_list);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        url,
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;