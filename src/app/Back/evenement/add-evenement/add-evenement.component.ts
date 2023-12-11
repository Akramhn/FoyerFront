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
    private evenements: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
    
  ) {
    this.eventForm = this.fb.group({
      nomEvenement: ['', Validators.required],
      lieu: ['', Validators.required],
      dateEvenement: ['', Validators.required],
      description: ['', Validators.required],
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
    if (this.eventForm.invalid) {
      this.toastr.error('Please fill out all required fields.');
      return;
    }
    
    const formData = this.eventForm.value;
    const imageFile = this.selectedFile;
  

    console.log('FormData:', formData);
    console.log('ImageFile:', imageFile);
    if (imageFile) {
      

      this.evenements.addEvenement(formData, imageFile ).subscribe(
        (response) => {
          this.toastr.success('Evenement ajoutée avec succès');
          this.resetForm();
         
        },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'université', error);
        this.toastr.error('Erreur lors de l\'ajout de l\'université');
      }
      );
      
      this.router.navigate([`admin/evenement`]);
    
  }


 /**  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }*/


  }
}
