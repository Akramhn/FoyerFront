import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/Model/evenement';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvenementService } from '../../service/evenement.service';


@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent {
  list: Evenement[] = [];
  constructor(
    private evenements: EvenementService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.evenements.getEvenements().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.evenements.deleteEvenement(id).subscribe((res) => {
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
