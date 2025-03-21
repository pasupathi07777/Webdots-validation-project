import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login.Slice'
import signupReducer from '../features/signup.Slice'
import usersReducer from '../features/user.Slice'
import productReducer from '../features/product.Slice'
import confirmationReducer from '../features/confirmation.Slice'

export const store = configureStore({
  reducer: {
    loginReducer,
    signupReducer,
    usersReducer,
    productReducer,
    confirmationReducer
  },
})