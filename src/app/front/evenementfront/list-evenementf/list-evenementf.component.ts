import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import Swiper from 'swiper';



@Component({
  selector: 'app-list-evenementf',
  templateUrl: './list-evenementf.component.html',
  styleUrls: ['./list-evenementf.component.css']
})

export class ListEvenementfComponent {
  // userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  // list: Evenement[] = [];
  // buttonColorClass = 'not-clicked';
  // disabledButtons: { [key: number]: boolean } = {};
  // constructor(
  //   private toastr: ToastrService,
  //   private _dialog: MatDialog,
  // ){} 

  // ngOnInit(): void {
    
  // }
  // updateDisabledButtonsFromStorage() {
  //   this.list.forEach((event) => {
  //     const isDisabled = localStorage.getItem(`disabledButton_${event.idEvenement}`) === 'true';
  //     this.disabledButtons[event.idEvenement] = isDisabled;
  //   });
  // }


  // ngAfterViewInit() {
  //   // Initialize Swiper when the component is rendered
  //   const swiperPopular = new Swiper('.Evenement-container', {
  //     spaceBetween:32 ,
  //     grabCursor : true,
  //     centeredSlides : true,
  //     slidesPerView: 'auto',
  //           // Your Swiper options here
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   });
  // }


  // truncateDescription(description: String, wordLimit: number): String {
  //   const words = description.split(' ');
  //   if (words.length > wordLimit) {
  //     return words.slice(0, wordLimit).join(' ') + '...';
  //   } else {
  //     return description;
  //   }
  // }
}
