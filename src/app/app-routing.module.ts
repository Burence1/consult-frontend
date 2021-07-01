import { OnboardComponent } from './onboard/onboard.component';
import { OneChatComponent } from './one-chat/one-chat.component';
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
import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { DirectoryComponent } from './directory/directory.component';
import { PhoneLoginComponent } from './components/authentication/phone-login/phone-login.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TasksHomeComponent } from './components/tasks/tasks-home/tasks-home.component';
import { NewPatientComponent } from './components/tasks/pages/new-patient/new-patient.component';
import { AddTaskComponent } from './components/tasks/pages/add-task/add-task.component';
import { TaskViewComponent } from './components/tasks/pages/task-view/task-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'onboard', pathMatch: 'full' },
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
  {path: 'tasks', component: TasksHomeComponent},
  {path: 'calendar', component: TaskComponent},
  {path: 'One', component: OneChatComponent},
  {path: 'onboard', component: OnboardComponent},
  {path: 'tasks', component: TasksHomeComponent},
  {path: 'calendar', component: TaskComponent},
  {path: '', redirectTo: 'patients', pathMatch: 'full'},
  {path: 'new-patient', component: NewPatientComponent},
  {path: 'patients', component: TaskViewComponent},
  {path: 'patients/:patientId', component: TaskViewComponent},
  {path: 'patients/:patientId/add-task', component: AddTaskComponent},
  { path: 'directory/user-profile/:profile.id', component: UserProfileComponent},
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
