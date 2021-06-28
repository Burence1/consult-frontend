export class Todo {
    id?: string;
    title?: string;
    description?: string;
    dateDue?: string;
    created?: Date = new Date();
    createdBy?: string;
    department?: string;
    assignedto?: string;
    done?: boolean;
}
