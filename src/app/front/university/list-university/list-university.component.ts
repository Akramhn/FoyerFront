import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Initialize Swiper when the component is rendered
    const swiperPopular = new Swiper('.University-container', {
      spaceBetween:32 ,
      grabCursor : true,
      centeredSlides : true,
      slidesPerView: 'auto',
            // Your Swiper options here
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
