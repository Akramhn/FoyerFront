import { Component, OnInit } from '@angular/core';
import { Coach } from 'src/app/Model/coach';
import { CoachService } from '../../services/coach-service.service';


@Component({
  selector: 'app-list-coach',
  templateUrl: './list-coach.component.html',
  styleUrls: ['./list-coach.component.css']
})
export class ListCoachComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private coachService: CoachService) {}

  ngOnInit(): void {
    this.loadCoaches();
  }

  loadCoaches(): void {
    this.coachService.getAllCoaches().subscribe(
      (coaches: Coach[]) => {
        this.coaches = coaches;
        this.coaches.forEach(coach => {
          coach.salle!=null;
          
        });
      }
    );
  }

  deleteCoach(id: number): void {
    this.coachService.deleteCoach(id).subscribe(
      () => {
        console.log('Coach deleted successfully');
        // Optionally, you can reload the coaches after deletion
        this.loadCoaches();
      }
    );
  }
}
