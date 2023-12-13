// list-salle.component.ts
import { Component, OnInit } from '@angular/core';
import { SalleService } from '../../services/salle.service';
import { Salle } from 'src/app/Model/salle';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css']
})
export class ListSalleComponent implements OnInit {
  salles: Salle[] = [];

  constructor(private salleService: SalleService) {}

  ngOnInit(): void {
    this.retrieveSalles();
  }

  retrieveSalles(): void {
    this.salleService.retrieveSalles().subscribe(
      (data: Salle[]) => {
        this.salles = data;
        console.log(this.salles); // Log the data to verify
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
