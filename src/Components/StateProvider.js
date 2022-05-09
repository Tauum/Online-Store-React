import React, {createContext, useContext, useReducer} from 'react'

// prepares data layer
export const StateContext = createContext();

// wraps applicationa and incorperates data layer
export const StateProvider = ({ reducer, initialState, children}) => (
<StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
</StateContext.Provider>

);

// for pulling data from data layer
export const useStateValue = () => useContext(StateContext);