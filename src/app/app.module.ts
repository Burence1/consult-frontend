import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MaterialModule } from './shared/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagingService } from './services/push-notifications/messaging.service';
import { AsyncPipe } from '@angular/common';
import { ConfirmEqualValidatorDirective } from './shared/material/material/confirm-equal-validator.directive';


import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { EmailComponent } from './components/authentication/email/email.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';


import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { environment } from 'src/environments/environment';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { ProfileComponent } from './components/userProfile/profile/profile.component';
import { DropzoneDirective } from './dropzone.directive';

import { ToastrModule } from 'ngx-toastr';
import { MatCarouselModule } from 'ng-mat-carousel';


// import { TasksComponent } from './components/tasks/tasks.component';
// import { TaskDialogComponent } from './components/tasks/task-dialog/task-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { DirectoryComponent } from './directory/directory.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RoomlistsComponent } from './components/roomlists/roomlists.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDialogComponent } from './components/tasks/task-dialog/task-dialog.component';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateProfileComponent } from './components/userProfile/update-profile/update-profile/update-profile.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TasksHomeComponent } from './components/tasks/tasks-home/tasks-home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEqualValidatorDirective,
    EmailComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    NavbarComponent,
    ChatroomComponent,
    ChatFeedComponent,
    ChatUsersComponent,
    ProfileComponent,
    DropzoneDirective,
    NotFoundComponent,
    TasksComponent,
    TaskDialogComponent,
    AddRoomComponent,
    RoomlistsComponent,
    DirectoryComponent,
    NewTaskComponent,
    DashboardComponent,
    UpdateProfileComponent,
    TaskComponent,
    TasksHomeComponent
  ],
  entryComponents: [AddRoomComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatIconModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
