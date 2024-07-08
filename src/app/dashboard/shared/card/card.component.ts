import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../orders/order.model';
import { DataStorageService } from '../data-storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input()
  order!: Order;
  @Output() ondeleteOrder = new EventEmitter<boolean>();


  constructor(private router: Router, private dataStorageService: DataStorageService, private loaderService: LoaderService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    console.log(this.order);

  }

  deleteOrder(orderId: string) {
    this.dataStorageService.deleteOrder(orderId).subscribe(response => {
      this.notificationService.showSuccess("Order deleted successfully")
      this.ondeleteOrder.emit(true)
    },
      error => {
        this.loaderService.hideLoader();
        console.error('Error adding employee', error);
        this.notificationService.showError("Please try again!")

      });

  }
}
