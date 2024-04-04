import { configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  }
})

export default store;