import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface, ProjectInterface } from '../../ts'

export interface ProjectsState {
  projects: ProjectInterface [],
}

// columns: [
//   {
//     id: 'queue',
//     tasks: []
//   },
//   {
//     id: 'development',
//     tasks: []
//   },
//   {
//     id: 'done',
//     tasks: []
//   },
// ],
const initialState: ProjectsState = {
    projects: [
      {
        id: "",
        title: "",
        description: "",
        status: "",
        createdAt: ["", ""],
        tasks: []
      }
    ],
}

const updateLocalStorage = (projects: ProjectInterface[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
      updateLocalStorage(state.projects);
    },

    addProject: (state, action: PayloadAction<ProjectInterface>) => {
      state.projects.push(action.payload);
      updateLocalStorage(state.projects);
    },

    loadProjects: (state, action: PayloadAction<ProjectInterface[]>) => {
      state.projects = action.payload;
    },

    addTask: (state, action: PayloadAction<{projectId: string | undefined, task: TaskInterface}>) => {
      state.projects.map(project => (project.id === action.payload.projectId) ? project.tasks.push(action.payload.task) : project);

      state.projects.map(project => project.id === action.payload.projectId ? project.status = 'progress' : project);

      updateLocalStorage(state.projects);
    },

    deleteTask: (state, action: PayloadAction<{projectId: string | undefined, taskId: string}>) => {
      // state.projects.map(item => (item.id === action.payload.projectId) ? item.tasks.filter(task => task.id !== action.payload.taskId) : item);
      const currentProject = state.projects.filter(project => project.id === action.payload.projectId)[0];

      //delete task in project
      currentProject.tasks = currentProject.tasks.filter(task => task.id !== action.payload.taskId);

      if (currentProject.tasks.length === 0) {
        currentProject.status = 'progress';
      }

      updateLocalStorage(state.projects);
    },

    updateTaskStatus: (state, action: PayloadAction<{projectId: string | undefined, taskId: string, newStatus: string, newIndex?: number}>) => {
      
      const currentProject = state.projects.filter(project => project.id === action.payload.projectId)[0];
      
      
      //update task status
      currentProject.tasks.map(task => task.id === action.payload.taskId ? task.status = action.payload.newStatus : task);

      let doneTasks = 0;

      //counting of done tasks
      currentProject.tasks.map(task => task.status === 'done' ? doneTasks++ : doneTasks);
      
      //check if all tasks in project have done
      (currentProject.tasks.length === doneTasks) ? currentProject.status = 'done' : currentProject.status = 'progress';

      updateLocalStorage(state.projects);
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  deleteProject, 
  addProject, 
  loadProjects, 
  addTask, 
  deleteTask, 
  updateTaskStatus 
} = projectsSlice.actions

export default projectsSlice.reducer