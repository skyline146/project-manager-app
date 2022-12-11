export interface TaskInterface {
    id: string,
    title: string,
    description: string,
    createdAt: string [],
}

export interface ColumnInterface {
    id: string,
    tasks: TaskInterface [],
}


export interface ColumnsInterface {
    [key: string]: ColumnInterface
}

export interface ProjectInterface {
    id: string,
    title: string,
    description: string,
    status: string,
    createdAt: string [],
    columns: ColumnsInterface 
}

export interface RouteInterface {
    path: string,
    element: JSX.Element
}