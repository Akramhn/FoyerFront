import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { Universite } from 'src/app/Model/universite';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements OnInit {
  list: Universite[] = [];
  constructor(
    private universiteS: UniversityService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.universiteS.getUniversites().subscribe((data) => {
      this.list = data;
      console.log(data);
    });
  }

  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.universiteS.deleteUniversite(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');
        setTimeout(() => {
          location.reload(); // Reload the page after deletion
        }, 2000);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }
}
