import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvenementService } from '../../service/evenement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modal-evenement',
  templateUrl: './add-modal-evenement.component.html',
  styleUrls: ['./add-modal-evenement.component.css']
})
export class AddModalEvenementComponent {
  eventForm: FormGroup; 
  selectedFile?: File;
  
  constructor(
    private _dialogRef: MatDialogRef<AddModalEvenementComponent>,
    private fb: FormBuilder,
    private evenements: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
    private _dialog: MatDialog
    
  ) {
    this.eventForm = this.fb.group({
      nomEvenement: [''],
      lieu: [''],
      dateEvenement:[''],
      description:[''],
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
          this._dialogRef.close(true);
          location.reload();
        },
        
        
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'université', error);
        this.toastr.error('Erreur lors de l\'ajout de l\'université');
      }
      
      );
    
  }
  }
  
}
