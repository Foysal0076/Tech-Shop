
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types'


const cartReducers = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(cartItem => cartItem.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.product === existItem.product ? item : cartItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }

        default:
            return state
    }
}

export default cartReducers
