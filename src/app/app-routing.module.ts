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
import { ProfileComponent } from './components/profile/profile.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { PhoneLoginComponent } from './components/authentication/phone-login/phone-login.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';

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
  { path: 'tasks', component: TasksComponent },
  { path: 'add-room', component: AddRoomComponent},
  { path: 'roomlist', component: RoomlistsComponent},
  { path: 'chatfeed/:roomname', component: ChatFeedComponent},
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
