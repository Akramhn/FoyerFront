import { Component } from '@angular/core';
import { Foyer } from 'src/app/Model/foyer';
import { FoyerService } from '../../service/foyer.service';

@Component({
  selector: 'app-add-bloc-back',
  templateUrl: './add-bloc-back.component.html',
  styleUrls: ['./add-bloc-back.component.css']
})
export class AddBlocBackComponent{
  listFoyer: Foyer[] = [];
  constructor(private foyerS: FoyerService){}
  ngOnInit(): void {
    this.foyerS.getFoyers().subscribe((data) => {
      (this.listFoyer = data), console.log(data);
    });
  }
  
}
