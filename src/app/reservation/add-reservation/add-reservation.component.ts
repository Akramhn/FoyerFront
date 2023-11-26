import { Component } from '@angular/core';
import { AccordionItemDirective } from 'src/app/front/directives/accordion-item.directive';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent {
  panelOpenState = false;

  isCollapsed: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.isCollapsed[collapseId] = !this.isCollapsed[collapseId];
  }
}
