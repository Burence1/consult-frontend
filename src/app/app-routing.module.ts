import { RoomlistsComponent } from './components/roomlists/roomlists.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { ProfileComponent } from './components/userProfile/profile/profile.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
//import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { DirectoryComponent } from './directory/directory.component';
import { PhoneLoginComponent } from './components/authentication/phone-login/phone-login.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { CalendarComponent } from './components/tasks/calendar/calendar.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'email-login', component: EmailComponent },
  { path: 'phone-login', component: PhoneLoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'chats', component: ChatroomComponent },
  { path: 'password_reset', component: ForgotPasswordComponent },
  { path: 'directory', component: DirectoryComponent },
  { path: 'add-room', component: AddRoomComponent},
  { path: 'roomlist', component: RoomlistsComponent},
  { path: 'chatfeed/:roomname', component: ChatFeedComponent},
  {path: 'tasks', component: TasksListComponent},
  {path: 'calendar', component: CalendarComponent},
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
