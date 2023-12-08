import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { Universite } from 'src/app/Model/universite';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FoyerService } from '../../service/foyer.service';
import { Foyer } from 'src/app/Model/foyer';
import { UpdateUniversityComponent } from '../update-university/update-university.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUniversityComponent } from '../add-university/add-university.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements OnInit {
  list: Universite[] = [];

  constructor(
    private fb: FormBuilder,
    private universiteS: UniversityService,
    private foyerS: FoyerService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
    private _dialog: MatDialog
  //  private modalService: NgbModal
    
  ){} 

  ngOnInit(): void {
    this.universiteS.getUniversites().subscribe((data) => {
      this.list = data;
      this.list.forEach(uni => {
        this.foyerS.getFoyerByUni(uni.idUniversite).subscribe((foyer: Foyer) => {
          uni.foyer = foyer;
        });
      });    
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
 
  openUpdate(data: any) {
    this._dialog.open(UpdateUniversityComponent, { data });
    console.log("data" , data);
  }

  }
