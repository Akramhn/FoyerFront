import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
