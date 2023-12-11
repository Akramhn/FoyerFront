import { Component, Input } from '@angular/core';
import { Universite } from 'src/app/Model/universite';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  @Input() selectedUniversity: Universite | undefined;


}
