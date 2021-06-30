import { CalendarEvent } from 'angular-calendar';

export interface myEvent extends CalendarEvent{
    description?: string;
    creator?: string;
    assignedTo?: string;
    status?: string;
    done?: string;
<<<<<<< HEAD
<<<<<<< HEAD
    owner: string;
=======
    owner: string
>>>>>>> 8c192a21e1e0229b42e1cb6c61e0cf79bb889193
=======
    owner: string;
>>>>>>> cabdbde1cc003b86a4aab18723d329793d3c6649
}
