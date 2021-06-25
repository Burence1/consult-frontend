export interface Task{
    id?: string,
    title: string,
    description: string,
    owner: string,
    dateDue: any,
    created: Date
}
//add status, creator, donedone