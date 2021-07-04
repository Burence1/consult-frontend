import { CalendarEvent } from "angular-calendar";

export interface myEvent extends CalendarEvent{
    description?: string;
    creator?: string;
    assignedTo?: string;
    status?: string;
    done?: string;
    owner: string;
}
