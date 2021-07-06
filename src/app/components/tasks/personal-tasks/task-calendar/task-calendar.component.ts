import { Component, OnInit,  ChangeDetectionStrategy} from '@angular/core';
import { CalendarEvent, CalendarView} from 'angular-calendar';
import { endOfDay,  isSameDay, isSameMonth, startOfDay, } from 'date-fns';
import { myEvent } from './event';
import { Subject } from 'rxjs';
import { NewTaskService } from '../services/events.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/profile';


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
  currentId: string;
  profiles: Profile[];
  profile: Profile = new Profile;

  view: CalendarView = CalendarView.Month
  CalendarView = CalendarView


  events: myEvent[] = [
    {
      start: new Date(),
      title: "Assist the MD and clinical admins",
      owner: this.profile.displayName,
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
  constructor(private service: NewTaskService,  private auth: AuthService, private profileService: ProfileService) {
      
    this.auth.user.subscribe((user) => {
      this.currentId = user.uid;
      this.profileService.fetchProfileApi(this.currentId).subscribe((res) => {
          this.profile = res;

          this.tasks = this.service.getTasks()
          this.tasks.forEach((items: any[]) =>{
            items.forEach(item => {
             let newItem = {
               start: item.dateDue.toDate(),
               title: item.title,
               owner: item.owner,
             }
             if(this.profile.displayName === newItem.owner){
              this.events.push(newItem)
             }
             
            
            })
          })

        },(error) => {
          console.error(error);
        });
    });

   }

  
  ngOnInit(): void {
  }
}
