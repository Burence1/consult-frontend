import { Component, OnInit,  ChangeDetectionStrategy} from '@angular/core';
import { CalendarEvent, CalendarView} from 'angular-calendar';
import { endOfDay,  isSameDay, isSameMonth, startOfDay, } from 'date-fns';
import { myEvent } from './event';
import { Subject } from 'rxjs';
import { NewTaskService } from '../services/events.service';


@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {
  viewDate: Date = new Date()

  tasks: any;
  dailyEvents: any;
  dailyDate: any;

  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView


  events: myEvent[] = [
    {
      start: new Date(),
      title: "Assist the MD and clinical admins",
      owner: "Nurse John"
    }
  ]

  activeDayIsOpen: boolean = true;
  

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

  


  eventClicked({event}: { event: CalendarEvent}): void{
   
  }
  constructor(private service: NewTaskService) {

   }

  
  ngOnInit(): void {
    console.log("this ones",this.service.getEvents())
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
      // console.log("NEW",newItem)
       this.events.push(newItem)
      
      })
    })
   
    console.log("Data",this.tasks)
  }
}
