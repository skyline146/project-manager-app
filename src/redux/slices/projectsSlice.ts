import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface, ProjectInterface } from '../../ts'

export interface ProjectsState {
  projects: ProjectInterface [],
}

const initialState: ProjectsState = {
    projects: [],
}

const updateLocalStorage = (projects: ProjectInterface[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    loadProjects: (state, action: PayloadAction<ProjectInterface[]>) => {
      state.projects = action.payload;
    },

    addProject: (state, action: PayloadAction<ProjectInterface>) => {
      state.projects.push(action.payload);
      updateLocalStorage(state.projects);
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
      updateLocalStorage(state.projects);
    },

    addTask: (state, action: PayloadAction<{projectId: string | undefined, task: TaskInterface}>) => {
      state.projects.map(project => (project.id === action.payload.projectId) ? project.columns['queue'].tasks.push(action.payload.task) : project);

      state.projects.map(project => project.id === action.payload.projectId ? project.status = 'progress' : project);

      updateLocalStorage(state.projects);
    },

    deleteTask: (state, action: PayloadAction<{projectId: string | undefined, columnId: string, taskId: string}>) => {
      const {projectId, columnId, taskId} = action.payload;
      
      const currentProject = state.projects.filter(project => project.id === projectId)[0];

      //delete task in project
      currentProject.columns[columnId].tasks = currentProject.columns[columnId].tasks.filter(task => task.id !== taskId);

      //check if tasks exist in 'done' column
      if (currentProject.columns['done'].tasks.length) {
        if (currentProject.columns['queue'].tasks.length === 0 && currentProject.columns['development'].tasks.length === 0) {
          currentProject.status = 'done';
        } else  {
          currentProject.status = 'progress';
        }
        
      } else {
        currentProject.status = 'progress';
      }

      updateLocalStorage(state.projects);
    },

    updateTaskStatus: (state, action: PayloadAction<{projectId: string | undefined, taskId: string, oldStatus: string, newStatus: string, oldIndex: number, newIndex: number}>) => {

      const {projectId, taskId, oldStatus, newStatus, oldIndex, newIndex} = action.payload;
      
      const currentProject = state.projects.filter(project => project.id === projectId)[0];
      const task = currentProject.columns[oldStatus].tasks.filter(task => task.id === taskId)[0];
      
      //delete task from previous column
      currentProject.columns[oldStatus].tasks.splice(oldIndex, 1);

      //add task in new column with right position
      currentProject.columns[newStatus].tasks.splice(newIndex, 0, task);

      //check if all tasks in project have done
      (currentProject.columns['done'].tasks.length && currentProject.columns['queue'].tasks.length === 0 && currentProject.columns['development'].tasks.length === 0) ? 
      currentProject.status = 'done' : currentProject.status = 'progress';

      updateLocalStorage(state.projects);
    },

    updateTasksOrder: (state, action: PayloadAction<{projectId: string | undefined, taskId: string, columnId: string, oldIndex: number, newIndex: number}>) => {

      const {projectId, taskId, columnId, oldIndex, newIndex} = action.payload;
      
      const currentProject = state.projects.filter(project => project.id === projectId)[0];
      const task = currentProject.columns[columnId].tasks.filter(task => task.id === taskId)[0];
      
      //update tasks order in column
      currentProject.columns[columnId].tasks.splice(oldIndex, 1);
      currentProject.columns[columnId].tasks.splice(newIndex, 0, task);

      updateLocalStorage(state.projects);
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  deleteProject, 
  addProject, 
  loadProjects, 
  addTask, 
  deleteTask,
  updateTaskStatus,
  updateTasksOrder
} = projectsSlice.actions

export default projectsSlice.reducer