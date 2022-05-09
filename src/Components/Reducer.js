export const initialState = {
    // cart: [],
    cart: { id: "", userID: "", items: [] },

    user: [],
    orders: [],
    item: [],
    category: [],
    search: [],
    ipaddress: ["http://localhost:8080"] //  global variable because isp keeps changing ip address]
};

export const getCartTotal = (cart) => {
    // this needs to multipy each item by amount
    return (cart?.items?.reduce((amount, item) => (item.price * item.amount) + amount, 0)).toFixed(2);
}

export const getCartDiscount = (cart) => {
    if (getCartTotal(cart) >= 50) {
        return (getCartTotal(cart) / 100 * 10).toFixed(2)
    }
    return 0
}
export const getShippingTotal = (cart) => {
    return cart.items?.length * 5
}

export const getAbsoluteTotal = (cart) => {
    return ((getCartTotal(cart) - getCartDiscount(cart)) + getShippingTotal(cart)).toFixed(2)
}

const Reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case "SET_ITEM":
            return { ...state, item: action.item }
        case "SET_CATEGORY":
            return { ...state, category: action.category }
        case "SEARCH":
            return { ...state, search: action.search }
        case "SET_SEARCH_ITEMS":
            return { ...state, search: action.search }

        case 'ADD_TO_CART': // this is used to add an item to cart home, search and clicking item

            let newCartItems1 = [...state.cart.items];
            let foundObjectID = newCartItems1.findIndex(({ id }) => id === action.item.id);
            let newCart1 = { id: state.cart.id, userID: state.cart.userID, items: newCartItems1 }

            if (foundObjectID >= 0 && foundObjectID < newCartItems1.length) {
                //if ammount adding is less than maximum 
                if (newCartItems1[foundObjectID].stockCount >= (action.item.amount + newCartItems1[foundObjectID].amount)) {
                    newCartItems1[foundObjectID] = { ...newCartItems1[foundObjectID], amount: newCartItems1[foundObjectID].amount + action.item.amount }
                    return { ...state, cart: newCart1 };
                }
                else { // V if ammount adding is over maximum available it will only give the available 
                    newCartItems1[foundObjectID] = { ...newCartItems1[foundObjectID], amount: newCartItems1[foundObjectID].stockCount }
                    return { ...state, cart: newCart1 };
                }
            }
            newCart1.items = [...newCart1.items, action.item];
            return { ...state, cart: newCart1 };

        case 'INCREASE_IN_CART': // this is used to increase cart item by 1 FROM CART AND ORDER GENERATION
            let newCartItems2 = [...state.cart.items];
            let foundObjectID2 = newCartItems2.findIndex(({ id }) => id === action.item.id);
            let newCart2 = { id: state.cart.id, userID: state.cart.userID, items: newCartItems2 }

            if (foundObjectID2 >= 0 && foundObjectID2 < newCartItems2.length) {
                if (newCartItems2[foundObjectID2].stockCount >= (action.item.amount + 1)) {
                    newCartItems2[foundObjectID2] = { ...newCartItems2[foundObjectID2], amount: newCartItems2[foundObjectID2].amount + 1 }

                    return { ...state, cart: newCart2 };
                }
                else { return { ...state } }
            }
            // update to backend here
            newCart2.items = [...newCart2.items, action.item];
            return { ...state, cart: newCart2 };
        
        case 'REDUCE_IN_CART': // this is used to reduce cart item by 1 FROM CART AND ORDER GENERATION
            let newCartItems3 = [...state.cart.items];
            let foundObjectID3 = newCartItems3.findIndex(({ id }) => id === action.item.id);
            let newCart3 = { id: state.cart.id, userID: state.cart.userID, items: newCartItems3 }

            if (foundObjectID3 >= 0 && foundObjectID3 < newCartItems3.length) {
                if (newCartItems3[foundObjectID3].amount > 1) {
                    newCartItems3[foundObjectID3] = { ...newCartItems3[foundObjectID3], amount: newCartItems3[foundObjectID3].amount - 1 }

                    return { ...state, cart: newCart3 };
                }
                else { return { ...state } }
            }

        case 'REMOVE_FROM_CART':
            const index = state.cart.items.findIndex((cartItem) => cartItem.id === action.id)
            let newCartItems4 = [...state.cart.items];
            let newCart4 = { id: state.cart.id, userID: state.cart.userID, items: newCartItems4 }
            if (index >= 0) { newCartItems4.splice(index, 1); }
            else { console.warn(`cant remove product - id > ${action.id} - Error`) }

            return { ...state, cart: newCart4 }

        case "EMPTY_CART":
            // update to backend here
            return { ...state, cart: { id: state.cart.id, userID: state.cart.userID, items: [] } }

        case 'CREATE_ORDER':
            return { ...state, orders: [...state.orders, action.order], };

        case "LOGIN_RECIEVED":
            return { ...state, user: action.user }

        case "LOGOUT_RECIEVED":
            return { state: [] }

        case "UPDATE_USER_CART":
            return { ...state, cart: action.cart }

        case "UPDATE_USER_ORDERS":
            return { ...state, orders: action.orders }

        default:
            return state;
    }

};

export default Reducer;

