import { Component, OnInit,  ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { myEvent } from './task';
import { Subject } from 'rxjs';
import { Task } from '../task';
import { NewTaskService } from '../tasks-services/newtask.service';
import { CurrentUser } from '../tasks.component';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  viewDate: Date = new Date()

  tasks: any;
  dailyEvents: any;
  dailyDate: any;

  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView
  user: CurrentUser;

  //


  events: myEvent[] = []
  //

  activeDayIsOpen: boolean = true;

  constructor(private service: NewTaskService, private auth: AuthService,) {
    this.auth.authUser().subscribe((res: any) =>{
      this.user = {
        name: res.displayName,
        email: res.email
      }
    });
  }

  ngOnInit(): void {
    this.tasks = this.service.getTasks()
    this.tasks.forEach((items: any[]) =>{
      items.forEach(item => {
        // console.log(item.dateDue.toDate())
        // console.log("ITEM",item)
       let newItem = {
         start: item.from.toDate(),
         end: item.to.toDate(),
         title: item.title,
         owner: item.owner,
       }
       console.log("NEW",newItem)
       if(this.user.name === newItem.owner){
        this.events.push(newItem)
       }
      
      })
    })
   
    console.log("Data",this.tasks)
  }


  //
  dayClicked({ date, events }: { date: Date; events: any }): void {
    //console.log("CLICKED",date)
    console.log("Events(s)",events)
    this.dailyEvents = events;
    this.dailyDate = date;
    events.forEach(event =>{
      console.log("e",event)
    })

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


  

}
