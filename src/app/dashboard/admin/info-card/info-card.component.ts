import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',

  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias for 'void => *' (when the element is added)
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias for '* => void' (when the element is removed)
        animate(300, style({ opacity: 0 }))
      ])
    ]),
    trigger('scaleUp', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate(300, style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'scale(0.5)' }))
      ])
    ])
  ]
})
export class InfoCardComponent {
  showCard = true;
  @Input() countNumber: number = 0;
  @Input() countType: string = "";
}
