import { Component } from '@angular/core';
import { MessagingService } from './services/push-notifications/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  opened!: boolean;
  title = 'Consult';
  message;

  constructor(private messagingService: MessagingService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
