import { Component } from '@angular/core';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from '../../service/bloc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}
  ngOnInit(): void {
    this.blocS.getBlocs().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.blocS.deleteBloc(id).subscribe((res) => {
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
