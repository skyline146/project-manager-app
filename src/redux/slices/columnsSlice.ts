import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface, ColumnInterface } from '../../ts'

export interface ColumnsState {
  columns: ColumnInterface [],
}

const initialState: ColumnsState = {
  columns: [
    {
      id: 'queue',
      tasks: []
    },
    {
      id: 'development',
      tasks: []
    },
    {
      id: 'done',
      tasks: []
    },
  ]
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    loadColumnData: (state, action: PayloadAction<TaskInterface []>) => {
      const tasks = action.payload;

      state.columns[0].tasks = tasks.filter(task => task.status === 'queue');
      state.columns[1].tasks = tasks.filter(task => task.status === 'development');
      state.columns[2].tasks = tasks.filter(task => task.status === 'done');
    },

    updateColumnOrder: (state, action: PayloadAction<{columnId: string, taskId: string, oldIndex: number, newIndex: number}>) => {
      const { tasks } = state.columns.filter(column => column.id === action.payload.columnId)[0];

      const task = tasks.filter(task => task.id === action.payload.taskId);

      tasks.splice(action.payload.oldIndex, 1);
      tasks.splice(action.payload.newIndex, 0, ...task);
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  loadColumnData,
  updateColumnOrder
} = columnsSlice.actions

export default columnsSlice.reducer