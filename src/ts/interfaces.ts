export interface TaskInterface {
    id: string,
    title: string,
    description: string,
    status: string,
    createdAt: string [],
}

export interface ColumnInterface {
    id: string,
    tasks: TaskInterface [],
}

export interface ProjectInterface {
    id: string,
    title: string,
    description: string,
    status: string,
    createdAt: string [],
    tasks: TaskInterface [],
}

export interface RouteInterface {
    path: string,
    element: JSX.Element
}