import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../service/chambre.service';
import { Chambre } from 'src/app/Model/chambre';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddChambreComponent } from '../add-chambre/add-chambre.component';
import { UpdateChambreComponent } from '../update-chambre/update-chambre.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css', '../../../../styles.css'],
})
export class ListChambreComponent implements OnInit {
  list: Chambre[] = [];
  searchQuery: string = '';

  constructor(
    private chambreS: ChambreService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  getChambres() {
    if (this.searchQuery.trim() !== '') {
      // If search query is not empty, filter the list based on the query
      this.chambreS.getChambres().subscribe((data) => {
        this.list = data.filter((chambre) => {
          // Customize this condition based on your search requirements
          return (
            chambre.idChambre.toString().includes(this.searchQuery) ||
            chambre.numeroChambre.toString().includes(this.searchQuery) ||
            chambre.bloc.foyer.universite.nomUniversite.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            chambre.bloc.foyer.nomFoyer.toLowerCase().includes(this.searchQuery.toLowerCase())
            // Add more conditions for other properties as needed
            // For example: chambre.propertyName.toString().includes(this.searchQuery)
          );
        });
      });
    } else {
      // If search query is empty, retrieve the entire list
      this.chambreS.getChambres().subscribe((data) => {
        this.list = data;
        console.log(data);
      });
    }
  }
  

  ngOnInit(): void {
    this.getChambres();
  }

  openAddEditChambreForm() {
    const dialogRef = this._dialog.open(AddChambreComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getChambres();
      }
    });
  }

  onDelete(id: number) {
    // ...

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        // User clicked the confirm button
        this.chambreS.deleteChambre(id).subscribe((res) => {
          this.toastr.success('Deleted Successfully');
          this.getChambres();

          // Introduce a delay of, for example, 2 seconds (2000 milliseconds) before reloading
          setTimeout(() => {}, 2000);
        });
      } else {
        // User clicked the cancel button
        console.log('Deletion canceled by user');
      }
    });
  }

  openUpdate(data: any) {
    this._dialog.open(UpdateChambreComponent, { data });
    console.log('data', data);
  }
}
