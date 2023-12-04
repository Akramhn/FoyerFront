import { Component } from '@angular/core';
import { EvenementService } from '../../service/evenement.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Evenement } from 'src/app/Model/evenement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-evenement',
  templateUrl: './add-evenement.component.html',
  styleUrls: ['./add-evenement.component.css']
})
export class AddEvenementComponent {
  eventForm: FormGroup; 
  selectedFile?: File;
  constructor(
    private fb: FormBuilder,
    private eventS: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
  //  private modalService: NgbModal
    
  ) {
    this.eventForm = this.fb.group({
      nomUniversite: [''],
      adresse: [''],
      
    });
  }

  resetForm() {
    this.eventForm.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onAddEvenement() {
    const formData = this.eventForm.value;

  }

  }
  


  


