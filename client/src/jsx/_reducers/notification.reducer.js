import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [

]

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state,action) {
      state.push({
          id:nanoid(),
          ...action.payload
      })
    },
    removeNotification(state,action) {
      return state.filter(n=>n.id !== action.payload )
    },
    resetNotification(state, action) {
      return []
    },
  },
})

export const { addNotification, removeNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer