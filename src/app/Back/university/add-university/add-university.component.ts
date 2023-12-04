import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent {
    
  universityForm: FormGroup;
  selectedFile?: File;
  constructor(
    private fb: FormBuilder,
    private universiteS: UniversityService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
  //  private modalService: NgbModal
    
  ) {
    this.universityForm = this.fb.group({
      nomUniversite: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      
    });
  }

  resetForm() {
    this.universityForm.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onAddUniversite() {
    const formData = this.universityForm.value;
    const imageFile = this.selectedFile;
  
    if (imageFile) {
      this.universiteS.addUniversiteWithImage(formData, imageFile).subscribe(
        (response) => {
          this.toastr.success('Université ajoutée avec succès');
          this.resetForm();
         
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

  onUpload() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
      this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        });
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
  

  getImage() {
    this.httpClient.get('http://localhost:8080/image/get/' )
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
