import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { myEvent } from './task';
import { Subject } from 'rxjs';
import { Task } from '../task';
import { NewTaskService } from '../tasks-services/newtask.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  viewDate: Date = new Date()

  tasks: any;
  dailyEvents: any;
  dailyDate: any;

  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  //
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  handleEvent(action: string, event: CalendarEvent): void{

  }

  events: myEvent[] = [
    {
      start: new Date(),
      title: "Assist the MD and clinical admins",
      owner: "Nurse John"
    }
  ]
  //
  oldevents: myEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: '3 day event',
    //   description: 'first event trial',
    //   creator: "Jane",
    //   color: this.colors.red.primary,
    //   actions: this.actions,
    //   allDay: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'endless date',
    //   description: 'fourth event trial',
    //   creator: "John",
    //   color: this.colors.yellow.primary,
    //   actions: this.actions,
    //   allDay: true
    // },
  ];


  activeDayIsOpen: boolean = true;
  //
  dayClicked({ date, events }: { date: Date; events: any }): void {
    console.log("CLICKED",date)
    console.log("Events(s)",events)
    this.dailyEvents = events;
    this.dailyDate = date;

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView): void{
    this.view = view
  }

  refresh: Subject<any> = new Subject();

  addEvent(): void{
    this.events = [
       ...this.events,
       {
        title: 'New event',
        description: 'a newly added event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red.primary,
        owner: "Dr Ann",
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]
  }

  deleteEvent(eventToDelete: CalendarEvent): void{
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  eventClicked({event}: { event: CalendarEvent}): void{
   
  }
  constructor(private service: NewTaskService) {

   }

  
  ngOnInit(): void {
    this.tasks = this.service.getTasks()
    this.tasks.forEach((items: any[]) =>{
      items.forEach(item => {
        // console.log(item.dateDue.toDate())
        // console.log("ITEM",item)
       let newItem = {
         start: item.dateDue.toDate(),
         title: item.title,
         owner: item.owner,
       }
       console.log("NEW",newItem)
       this.events.push(newItem)
      
      })
    })
   
    console.log("Data",this.tasks)
  }

}
