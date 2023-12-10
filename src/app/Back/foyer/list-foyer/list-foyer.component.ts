import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoyerService } from '../../service/foyer.service';
import { Foyer } from 'src/app/Model/foyer';
import { ToastrService } from 'ngx-toastr';
import { UpdateFoyerComponent } from '../update-foyer/update-foyer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-foyer',
  templateUrl: './list-foyer.component.html',
  styleUrls: ['./list-foyer.component.css'],
})
export class ListFoyerComponent implements OnInit {
  listFoyer: Foyer[] = [];
  constructor(private router: Router, private foyerS: FoyerService, private toastr: ToastrService,    private _dialog: MatDialog
    ) {}
  ngOnInit(): void {
    this.foyerS.getFoyers().subscribe((data)=>{
      this.listFoyer=data;
      console.log(data);
    });
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.foyerS.deleteFoyer(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');
        setTimeout(() => {
          location.reload(); // Reload the page after deletion
        }, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }
  openUpdate(data: any) {
    this._dialog.open(UpdateFoyerComponent, { data });
    console.log("data" , data);
    
  }

}
