// import { Component, OnInit } from '@angular/core';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { NotificationService } from './notification.service';


// @Component({
//   selector: 'app-notification',
//   templateUrl: './notification.component.html',
//   styleUrls: ['./notification.component.css'],
//   animations: [
//     trigger('slideInOut', [
//       transition(':enter', [
//         style({ transform: 'translateY(-100%)', opacity: 0 }),
//         animate('200ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
//       ]),
//       transition(':leave', [
//         animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 })),
//       ]),
//     ]),
//   ],
// })
// export class NotificationComponent implements OnInit {
//   notifications: any[] = [];

//   constructor(private notificationService: NotificationService) { }

//   ngOnInit(): void {
//     this.notificationService.getNotifications().subscribe((notification) => {
//       this.notifications.push(notification);
//       setTimeout(() => this.removeNotification(notification), 3000);
//     });
//   }

//   removeNotification(notification: any) {
//     this.notifications = this.notifications.filter((n) => n !== notification);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate(
          '300ms ease-out',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        )
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notification) => {
      this.notifications.push(notification);
      // Adjust timeout to match animation duration (300ms enter + 2500ms visible = 2800ms)
      setTimeout(() => this.removeNotification(notification), 2800);
    });
  }

  removeNotification(notification: any) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }
}
