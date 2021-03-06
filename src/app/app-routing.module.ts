import { AddusersComponent } from './components/addusers/addusers.component';
import { ConvolistComponent } from './components/convolist/convolist.component';
import { AboutComponent } from './components/about/about.component';
import { OnboardComponent } from './onboard/onboard.component';
import { OneChatComponent } from './components/one-chat/one-chat.component';
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
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { DirectoryComponent } from './directory/directory.component';
import { PhoneLoginComponent } from './components/authentication/phone-login/phone-login.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { TasksHomeComponent } from './components/tasks/personal-tasks/tasks-home/tasks-home.component';
import { TaskViewComponent } from './components/tasks/patients-work/task-view/task-view.component';
import { FollowComponent } from './components/follow/follow/follow.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'onboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'email-login', component: EmailComponent },
  { path: 'phone-login', component: PhoneLoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'chats', component: ChatroomComponent, canActivate: [AuthGuard]},
  { path: 'password_reset', component: ForgotPasswordComponent },
  { path: 'directory', component: DirectoryComponent,canActivate: [AuthGuard]},
  { path: 'follow', component: FollowComponent },

  { path: 'add-room', component: AddRoomComponent},
  { path: 'roomlist', component: RoomlistsComponent},
  { path: 'chatfeed/:roomname', component: ChatFeedComponent},
  {path: 'One', component: OneChatComponent},
  {path: 'onboard', component: OnboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'chatroom/:displayName',component: OneChatComponent},
  {path: 'onboard', component: OnboardComponent},
  {path: 'tasks', component: TasksHomeComponent, canActivate: [AuthGuard]},
  {path: 'patients', component: TaskViewComponent, canActivate: [AuthGuard]},
  {path: 'patients/:patientId', component: TaskViewComponent, canActivate: [AuthGuard]},
  {path: 'convolist',component:ConvolistComponent},
  {path: 'addusers',component:AddusersComponent},
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
