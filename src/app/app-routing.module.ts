import { ForgotPasswordComponent } from './components/authentication/authentication/forgot-password/forgot-password.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'email-login', component: EmailComponent },
  {path: 'signup', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'home', component: HomePageComponent},
  {path: 'chatroom', component: ChatroomComponent},
  { path: 'password_reset', component: ForgotPasswordComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
