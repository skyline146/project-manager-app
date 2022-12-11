import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface, ProjectInterface } from '../../ts'

export interface ProjectsState {
  projects: ProjectInterface [],
}

// projects: [
//   {
//     id: "",
//     title: "",
//     description: "",
//     status: "",
//     createdAt: ["", ""],
//     columns: {
//       'queue': {
//         id: 'queue',
//         tasks: []
//       },
//       'development': {
//         id: 'development',
//         tasks: []
//       },
//       'done': {
//         id: 'done',
//         tasks: []
//       },
//     }
//   }
// ],

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

      if (currentProject.columns['queue'].tasks.length === 0 && currentProject.columns['development'].tasks.length === 0 && currentProject.columns['done'].tasks.length === 0) {
        currentProject.status = 'progress';
      }

      updateLocalStorage(state.projects);
    },

    updateTaskStatus: (state, action: PayloadAction<{projectId: string | undefined, taskId: string, newStatus: string, newIndex?: number}>) => {

      const {projectId, taskId, newStatus, newIndex} = action.payload;
      
      const currentProject = state.projects.filter(project => project.id === projectId)[0];
      
      //update task status
      

      let doneTasks = 0;

      //counting of done tasks
      // currentProject.tasks.map(task => task.status === 'done' ? doneTasks++ : doneTasks);
      
      //check if all tasks in project have done
      // (currentProject.tasks.length === doneTasks) ? currentProject.status = 'done' : currentProject.status = 'progress';

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