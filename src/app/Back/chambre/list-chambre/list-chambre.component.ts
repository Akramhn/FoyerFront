import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../service/chambre.service';
import { Chambre } from 'src/app/Model/chambre';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddChambreComponent } from '../add-chambre/add-chambre.component';

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
  ngOnInit(): void {
    this.chambreS.getChambres().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }

  openAddEditChambreForm(){
    this._dialog.open(AddChambreComponent)
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.chambreS.deleteChambre(id).subscribe((res) => {
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
