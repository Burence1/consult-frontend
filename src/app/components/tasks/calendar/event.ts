import { CalendarEvent } from "angular-calendar";

export interface myEvent extends CalendarEvent{
    description?: string;
    creator?: string;
    assignedTo?: string;
    status?: string;
    done?: string;
<<<<<<< HEAD
    owner: string
=======
<<<<<<< HEAD
    owner: string;
=======
    owner: string
>>>>>>> 8c192a21e1e0229b42e1cb6c61e0cf79bb889193
>>>>>>> f87bec25887471d788d805fca45733d27ee37754
}
