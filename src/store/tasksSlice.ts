import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  description: string
  assignee: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
}

interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload)
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    },
    setTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: Task['status'] }>
    ) {
      const task = state.tasks.find(t => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    }
  }
})

export const { addTask, updateTask, deleteTask, setTaskStatus } =
  tasksSlice.actions

export default tasksSlice.reducer
