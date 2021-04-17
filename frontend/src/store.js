import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducers, productDetailsReducers } from './reducers/productReducers'
import cartReducers from './reducers/cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const middleWare = [thunk]

const reducer = combineReducers({
    productList: productReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare)))

export default store