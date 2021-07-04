import { Component, OnInit,  ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { myEvent } from './event';
import { Subject } from 'rxjs';
import { Task } from '../models/task';
import { NewTaskService } from '../services/events.service';
import { CurrentUser } from '../tasks/tasks.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFirestore } from '@angular/fire/firestore';


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
  userName: string = '';
  currentId: string;
  profiles: Profile[];
  profile: Profile = new Profile;

  //


  events: myEvent[] = []
  //

  activeDayIsOpen: boolean = true;

  constructor(private service: NewTaskService, private store: AngularFirestore) {
    this.events = this.service.getEvents();
     
  }

  ngOnInit(): void { 
   }

  dayClicked({ date, events}: { date: Date; events: any }): void {
    events = this.service.getEvents()
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

}
