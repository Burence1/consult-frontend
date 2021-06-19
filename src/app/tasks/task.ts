export interface Task{
    id?: string,
    title: string,
    description: string,
    owner: string,
    dateDue: Date,
    created: Date
}