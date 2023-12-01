import { Component, OnInit } from '@angular/core';
import { Participation } from 'src/app/Model/participation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ParticipationService } from '../../service/participation.service';

@Component({
  selector: 'app-list-participation',
  templateUrl: './list-participation.component.html',
  styleUrls: ['./list-participation.component.css']
})
export class ListParticipationComponent {

  
  list: Participation[] = [];
  constructor(
    private participations: ParticipationService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.participations.getParticipations().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.participations.deleteParticipation(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');

        // Introduce a delay of, for example, 2 seconds (2000 milliseconds) before reloading
        setTimeout(() => {
          location.reload(); // Reload the page after deletion
        }, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }

  onUpdate(id: number) {
    this.router.navigate([`/update/${id}`]);
  }

}
