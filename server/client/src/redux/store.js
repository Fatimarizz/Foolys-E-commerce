import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import CartReducer from './Cartcounter'
export default configureStore({
    reducer: {
        counter: counterReducer,
        Cartcounter:CartReducer
      },
})