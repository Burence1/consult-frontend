import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EmailComponent } from './authentication/email/email.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './home/home-page/home-page.component';


const firebaseConfig = {
  apiKey: 'AIzaSyB3mBUPgJ-drLGaMass8FdKRyJzToqEOa4',
  authDomain: 'userauth-3c76a.firebaseapp.com',
  projectId: 'userauth-3c76a',
  storageBucket: 'userauth-3c76a.appspot.com',
  messagingSenderId: '329320770247',
  appId: '1:329320770247:web:b0d6211ac58834b457ace2',
  measurementId: 'G-DXEDLCP9XL'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
