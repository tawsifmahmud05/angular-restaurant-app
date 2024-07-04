import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../orders/order.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input()
  order!: Order;


  constructor() { }
  ngOnInit(): void {
    console.log(this.order);

  }
}
