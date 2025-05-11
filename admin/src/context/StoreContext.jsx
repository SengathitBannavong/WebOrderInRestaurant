import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url  = "http://localhost:4000";

    const contextValue = {
        // data
        url,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;