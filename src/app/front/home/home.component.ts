import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(2rem)' }),
        animate(
          '2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
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
export class HomeComponent {
  count: number = 100;
  target: number = 1000;
  duration: number = 4000;

  ngOnInit(): void {
    this.startCountUp();
  }

  startCountUp(): void {
    const interval = this.duration / (this.target - this.count);
    const countInterval = setInterval(() => {
      this.count++;
      if (this.count === this.target) {
        clearInterval(countInterval);
      }
    }, interval);
  }
}
