import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/Model/evenement';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvenementService } from '../../service/evenement.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalEvenementComponent } from '../add-modal-evenement/add-modal-evenement.component';
import { UpdateEvenementComponent } from '../update-evenement/update-evenement.component';





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
    private router: Router,
    private _dialog: MatDialog
  ) {
  }
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
  getEvenements() {
    this.evenements.getEvenements().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }


  openModalAddEvenementForm() {
    const dialogRef = this._dialog.open(AddModalEvenementComponent);
    dialogRef.afterClosed().subscribe((data) => {       
      
    });
    
  }
  onUpdate(id: number) {
    this.router.navigate([`/update/${id}`]);
    const dialogRef = this._dialog.open(UpdateEvenementComponent);
    dialogRef.afterClosed().subscribe((data) => {       
      this.getEvenements();
    });
  }


      

  
}
