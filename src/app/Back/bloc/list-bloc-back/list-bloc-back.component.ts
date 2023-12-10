import { Component } from '@angular/core';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from '../../service/bloc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddChambreComponent } from '../../chambre/add-chambre/add-chambre.component';
import { MatDialog } from '@angular/material/dialog';
import { AddBlocBackComponent } from '../add-bloc-back/add-bloc-back.component';
import { ModifBlocBackComponent } from '../modif-bloc-back/modif-bloc-back.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list-bloc-back',
  templateUrl: './list-bloc-back.component.html',
  styleUrls: ['./list-bloc-back.component.css']
})
export class ListBlocBackComponent {
  list: Bloc[] = [];
  
  constructor(
    private blocS: BlocService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.blocS.getBlocs().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }
  openAddEditBlocForm(){
    const dialogRef = this._dialog.open(AddBlocBackComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.blocS.getBlocs().subscribe((data) => {
          (this.list = data), console.log(data);
        });
      }
    });
    
  }
  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.blocS.deleteBloc(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');
        this.blocS.getBlocs().subscribe((data) => {
          (this.list = data), console.log(data);
        });
        setTimeout(() => {}, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }

  openUpdate(data: any) {
    const dialogRef = this._dialog.open(ModifBlocBackComponent, { data });

    dialogRef.componentInstance.blocUpdated.subscribe(() => {
      this.updateBlocList();
    });
    
  }
  private updateBlocList() {
    this.blocS.getBlocs().pipe(debounceTime(10), distinctUntilChanged()).subscribe((data) => {
      this.list = data;
      console.log(data);
    });
  }

}
