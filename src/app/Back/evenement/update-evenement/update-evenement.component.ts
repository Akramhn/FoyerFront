import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evenement } from 'src/app/Model/evenement';

@Component({
  selector: 'app-update-evenement',
  templateUrl: './update-evenement.component.html',
  styleUrls: ['./update-evenement.component.css']
})
export class UpdateEvenementComponent implements OnInit {
  eventForm: FormGroup;
  selectedFile?: File;


  constructor(
    private fb: FormBuilder,
    private evenements: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _dialogRef: MatDialogRef<UpdateEvenementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evenement
  ) {
    this.eventForm = this.fb.group({
      idEvenement: new FormControl('', ),
      nomEvenement: new FormControl('', Validators.required),
      lieu: new FormControl('', Validators.required),
      dateEvenement: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.populateForm();
  }
  async populateForm() {
    const idEvenementPromise = this.data.idEvenement; 

    const nomEvenementPromise = this.data.nomEvenement; 
    const lieuPromise = this.data.lieu; 
    const dateEvenementPromise = this.data.dateEvenement; 
    const descriptionPromise = this.data.description; 


    // Use Promise.all to await all promises concurrently
    const [idEven,nomEvenement,lieu,dateEvenement,desEven] = await Promise.all([
      idEvenementPromise,
      nomEvenementPromise,
      lieuPromise,
      dateEvenementPromise,
      descriptionPromise,
    ]);

    // Now, set the form values
    this.eventForm.patchValue({
      idEvenement: idEven,
      nomEvenement: nomEvenement,
      lieu:lieu,
      dateEvenement:dateEvenement,
      description:desEven,
    
    });
  }
  resetForm() {
    this.eventForm.reset();
    this.selectedFile = undefined;
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpdateEvenement() {
    const formData = this.eventForm.value;

    const imageFile = this.selectedFile;
    console.log('FormData:', formData);
    console.log('ImageFile:', imageFile);
  
    if (imageFile) {
      

      this.evenements.updateEvenement(formData, imageFile ).subscribe(
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
  }
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;


}
