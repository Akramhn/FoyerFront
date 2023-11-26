import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../service/chambre.service';
import { Chambre } from 'src/app/Model/chambre';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html' ,
  styleUrls: ['./list-chambre.component.css','../../../../styles.css'],
})
export class ListChambreComponent implements OnInit {
  list: Chambre[] = [];
  constructor(private chambreS: ChambreService) {}
  ngOnInit(): void {
    this.chambreS.getChambres().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }
}
