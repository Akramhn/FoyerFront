import { Component } from '@angular/core';
import { Exercice } from 'src/app/Model/exercice';
import { ExerciceService } from '../../services/exercice-service.service';

@Component({
  selector: 'app-list-exercice',
  templateUrl: './list-exercice.component.html',
  styleUrls: ['./list-exercice.component.css']
})
export class ListExerciceComponent {

  exercices: Exercice[] = [];

  constructor(private exerciceService: ExerciceService) {}

  ngOnInit(): void {
    this.loadExercices();
  }

  loadExercices(): void {
    this.exerciceService.getAllExercices().subscribe(
      (data: Exercice[]) => {
        this.exercices = data;
      },
      error => {
        console.error('Error loading exercises: ', error);
      }
    );
  }

  deleteExercice(idExercice: number): void {
    this.exerciceService.removeExercice(idExercice).subscribe(
      () => {
        // Update the list after successful deletion
        this.loadExercices();
      },
      error => {
        console.error('Error deleting exercise: ', error);
      }
    );
  }

}
