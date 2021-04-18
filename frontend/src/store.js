import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducers, productDetailsReducers } from './reducers/productReducers'
import cartReducers from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleWare = [thunk]

const reducer = combineReducers({
    productList: productReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare)))

export default store