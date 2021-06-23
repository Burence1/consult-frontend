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
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { MessageComponent } from './components/message/message.component';
import { environment } from 'src/environments/environment';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { UserItemsComponent } from './components/user-items/user-items.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DropzoneDirective } from './dropzone.directive';

import { ToastrModule } from 'ngx-toastr';
import { MatCarouselModule } from 'ng-mat-carousel';


import { TasksComponent } from './tasks/tasks.component';
import { TaskDialogComponent } from './tasks/task-dialog/task-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './components/error-handling/not-found/not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AddRoomComponent } from './components/add-room/add-room.component';


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
    ChatFormComponent,
    ChatFeedComponent,
    MessageComponent,
    ChatUsersComponent,
    UserItemsComponent,
    ProfileComponent,
    DropzoneDirective,
    TasksComponent,
    NewTaskComponent,
    TaskDialogComponent,
    NotFoundComponent,
    AddRoomComponent
  ],

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
    DragDropModule
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
