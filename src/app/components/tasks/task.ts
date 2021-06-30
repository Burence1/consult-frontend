export class Task{
    id?: string;
    title: string;
    description: string;
    owner: string;
    dateDue: any;
    created: Date;
    from?: any;
    to?: any;
}
//add status, creator, donedone