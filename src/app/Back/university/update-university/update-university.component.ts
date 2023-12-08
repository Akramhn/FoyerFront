import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Universite } from 'src/app/Model/universite';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-update-university',
  templateUrl: './update-university.component.html',
  styleUrls: ['./update-university.component.css']
})
export class UpdateUniversityComponent implements OnInit {
  
  universityForm: FormGroup;
  selectedFile?: File;
  constructor(
    private fb: FormBuilder,
    private universiteS: UniversityService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private _dialogRef: MatDialogRef<UpdateUniversityComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Universite
  //  private modalService: NgbModal
    
  ){
    this.universityForm = this.fb.group({
      idUniversite: new FormControl('', ),
      nomUniversite: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      description: new FormControl(''),
      
    });
  }
ngOnInit(): void {
  this.populateForm();
}
  async populateForm() {
    const idUniversitePromise = this.data.idUniversite; // Assuming this is a promise

    const nomUniversitePromise = this.data.nomUniversite; // Assuming this is a promise
    const adressePromise = this.data.adresse; // Assuming this is a promise
    const descriptionPromise = this.data.description; // Assuming this is a promise


    // Use Promise.all to await all promises concurrently
    const [idUni,nomUni,adresseUni,desUni] = await Promise.all([
      idUniversitePromise,
      nomUniversitePromise,
      adressePromise,
      descriptionPromise,
    ]);

    // Now, set the form values
    this.universityForm.patchValue({
      idUniversite: idUni,
      nomUniversite: nomUni,
      adresse:adresseUni,
      description:desUni,
    
    });
  }
  
  resetForm() {
    this.universityForm.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onUpdateUniversite() {
    const formData = this.universityForm.value;
    const imageFile = this.selectedFile;
  
    if (imageFile) {
      this.universiteS.UpdateUniversiteWithImage(formData, imageFile).subscribe(
        (response) => {
          this.toastr.success('Université ajoutée avec succès');
          this._dialogRef.close(true);
         
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'université', error);
          this.toastr.error('Erreur lors de l\'ajout de l\'université');
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;

 /**  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }*/

  


}
