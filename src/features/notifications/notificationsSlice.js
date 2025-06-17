import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Bienvenido',
    body: 'Gracias por unirte',
    datetime: new Date().toISOString(),
    read: false,
  },
];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const { markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
