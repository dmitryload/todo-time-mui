import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '2ca60c7a-ae0e-49ec-a786-0de51de91cdc'
    }
})

export const todolistsAPI = {
    getTodolists: () => instance.get<TodolistType[]>('/todo-lists'),
    createTodolist: (title: string) => instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('/todo-lists', {title}),
    deleteTodolist: (id: string) => instance.delete<ResponseType>(`/todo-lists/${id}`),
    updateTodolist: (id: string, title: string) => instance.put<{ title: string }, AxiosResponse<ResponseType>>(`/todo-lists/${id}`, {title}),
    getTasks: (todolistId: string) => instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`),
    deleteTask: (todolistId: string, taskId: string) => instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`),
    createTask: (todolistId: string, title: string) => instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks`, {title}),
    updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
}

export const authAPI = {
    login: (data: LoginParamsType) => instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: string }>>>("/auth/login", data),
    logout: () => instance.delete<ResponseType>("/auth/login"),
    me: () => instance.get<ResponseType<MeType>>("/auth/me")
}

export type MeType = {
    id: number,
    email: string,
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    capcha?: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
