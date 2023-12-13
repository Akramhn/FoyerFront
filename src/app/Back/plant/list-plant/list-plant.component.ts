import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/Model/plant';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-list-plant',
  templateUrl: './list-plant.component.html',
  styleUrls: ['./list-plant.component.css']
})
export class ListPlantComponent implements OnInit {
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe(
      (plants) => {
        this.plants = plants;
      },
      (error) => {
        console.error('Error loading plants:', error);
      }
    );
  }

  deletePlant(id: number): void {
    this.plantService.deletePlantById(id).subscribe(
      () => {
        console.log('Plant deleted successfully');
        // Reload the plant list after deletion
        this.loadPlants();
      },
      (error) => {
        console.error('Error deleting plant:', error);
      }
    );
  }
}
