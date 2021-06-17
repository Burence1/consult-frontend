import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MaterialModule } from './shared/material/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { EmailComponent } from './components/authentication/email/email.component';

import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import {MatBadge, MatBadgeModule} from '@angular/material/badge'
import { MatDatepicker } from '@angular/material/datepicker';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { MessageComponent } from './components/message/message.component';
import { environment } from 'src/environments/environment';


// const firebaseConfig = {
//   apiKey: 'AIzaSyB3mBUPgJ-drLGaMass8FdKRyJzToqEOa4',
//   authDomain: 'userauth-3c76a.firebaseapp.com',
//   projectId: 'userauth-3c76a',
//   storageBucket: 'userauth-3c76a.appspot.com',
//   messagingSenderId: '329320770247',
//   appId: '1:329320770247:web:b0d6211ac58834b457ace2',
//   measurementId: 'G-DXEDLCP9XL'
// };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailComponent,
    HomePageComponent,
    NavbarComponent,
    ChatroomComponent,
    ChatFormComponent,
    ChatFeedComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatBadgeModule,
  ],
  providers: [MatDatepicker,],
  bootstrap: [AppComponent]
})
export class AppModule { }
