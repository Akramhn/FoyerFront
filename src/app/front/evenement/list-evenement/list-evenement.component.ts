import { Component } from '@angular/core';
import { EvenementService } from 'src/app/Back/service/evenement.service';
import { Evenement } from 'src/app/Model/evenement';
import Swiper from 'swiper';

@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent {
  list: Evenement[] = [];

  constructor(
    private evenements: EvenementService,
  ){} 

  ngOnInit(): void {
    this.evenements.getEvenements().subscribe((data) => {
      this.list = data;
      console.log(data);
    });
  }



  ngAfterViewInit() {
    // Initialize Swiper when the component is rendered
    const swiperPopular = new Swiper('.Evenement-container', {
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
