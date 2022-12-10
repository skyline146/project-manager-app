import { ProjectsPage, TasksPage, ErrorPage } from '../pages';

import { RouteInterface } from "../ts"

export const routes: RouteInterface [] = [
    {path: '/', element: <ProjectsPage/>},
    {path: '/project/:projectId', element: <TasksPage/>},
    {path: '*', element: <ErrorPage type='Page is not exist!'/>}
];