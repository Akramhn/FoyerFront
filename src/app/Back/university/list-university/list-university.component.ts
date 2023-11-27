import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { Universite } from 'src/app/Model/universite';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements OnInit {
  list: Universite[] = [];
  constructor(private universiteS: UniversityService, private router: Router) {}

  ngOnInit(): void {
    this.universiteS.getUniversites().subscribe(
      (data) => {
        this.list = data;  // Correction : Utilisez "=" au lieu de ","
        console.log(data);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des universités : ', error);
      }
    );
  }   
  
}
