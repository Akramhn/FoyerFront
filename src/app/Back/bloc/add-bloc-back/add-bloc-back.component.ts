import { Component } from '@angular/core';
import { Foyer } from 'src/app/Model/foyer';

@Component({
  selector: 'app-add-bloc-back',
  templateUrl: './add-bloc-back.component.html',
  styleUrls: ['./add-bloc-back.component.css']
})
export class AddBlocBackComponent {
  list: Foyer[] = [];
}
