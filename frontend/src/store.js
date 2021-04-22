import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducers, productDetailsReducers, productDeleteReducers, productCreateReducers, productUpdateReducers, produtCreateReviewReducers, productTopRatedReducers } from './reducers/productReducers'
import cartReducers from './reducers/cartReducers'
import { userDeleteReducer, userDetailsterReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { myOrderListReducer, orderCreateReducers, orderDeliverReducers, orderDetailsReducers, orderListReducer, orderPayReducers } from './reducers/orderReducers'


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleWare = [thunk]

const devtools = process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleWare)
    : composeWithDevTools(applyMiddleware(...middleWare))

const reducer = combineReducers({
    productList: productReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    users: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducers,
    orderPay: orderPayReducers,
    myOrderList: myOrderListReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducers,
    productReviewCreate: produtCreateReviewReducers,
    topRatedProducts: productTopRatedReducers,
})

const store = createStore(
    reducer,
    initialState,
    devtools
)

export default store