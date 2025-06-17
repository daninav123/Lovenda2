import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import wedding, { saveWedding } from './weddingSlice'
import tasks from './tasksSlice'
import finance from './financeSlice'
import notifications from './notificationsSlice'

const store = configureStore({
  reducer: {
    user,
    wedding,
    tasks,
    finance,
    notifications
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { saveWedding }
export default store
