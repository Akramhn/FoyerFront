import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { UniversityService } from 'src/app/Back/service/university.service';
import { Universite } from 'src/app/Model/universite';
import Swiper from 'swiper';
import { ReserTestComponent } from '../reser-test/reser-test.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements AfterViewInit {
  list: Universite[] = [];
  selectedUniversity: Universite | undefined;

  constructor(private universiteS: UniversityService,private router: Router) {}

  ngOnInit(): void {
    this.universiteS.getUniversites().subscribe((data) => {
      this.list = data;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    // Initialize Swiper when the component is rendered
    const swiperPopular = new Swiper('.University-container', {
      spaceBetween: 32,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      // Your Swiper options here
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  onUniversitySelected(university: Universite) {
    this.selectedUniversity = university;
    console.log(this.selectedUniversity)
    this.router.navigate(['/reservation',university.idUniversite]);
  }

  
}
