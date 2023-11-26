import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-reser-test',
  templateUrl: './reser-test.component.html',
  styleUrls: ['./reser-test.component.css'],
  animations: [

    trigger('fadeInImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(7rem)' }),
        animate(
          '2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class ReserTestComponent {
  panelOpenState = false;

}
