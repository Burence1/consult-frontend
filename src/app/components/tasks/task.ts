export class Task{
    id?: string;
    title: string;
    description: string;
    owner: string;
    dateDue: any;
    created: Date;
    from?: string;
    to?: string;
}
//add status, creator, donedone