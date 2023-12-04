import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../service/chambre.service';
import { Chambre } from 'src/app/Model/chambre';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddChambreComponent } from '../add-chambre/add-chambre.component';
import { UpdateChambreComponent } from '../update-chambre/update-chambre.component';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css', '../../../../styles.css'],
})
export class ListChambreComponent implements OnInit {
  list: Chambre[] = [];
  constructor(
    private chambreS: ChambreService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog
  ) {}

  getChambres() {
    this.chambreS.getChambres().subscribe((data) => {
      (this.list = data), console.log(data);
    });
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
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.chambreS.deleteChambre(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');
        this.getChambres();

        // Introduce a delay of, for example, 2 seconds (2000 milliseconds) before reloading
        setTimeout(() => {}, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }

  openUpdate(data: Chambre) {
    this._dialog.open(UpdateChambreComponent, { data });
    console.log("data" , data);
  }
}
