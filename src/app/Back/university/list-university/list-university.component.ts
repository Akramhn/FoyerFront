import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Router } from '@angular/router';
import { Universite } from 'src/app/Model/universite';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.css'],
})
export class ListUniversityComponent implements OnInit {
  list: Universite[] = [];
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
      nomUniversite: [''],
      adresse: [''],
      imageUrl: [''],
      // Ajoutez d'autres champs de l'université au besoin
      image: ['']
    });
  }

  ngOnInit(): void {
    this.universiteS.getUniversites().subscribe((data) => {
      this.list = data;
      console.log(data);
    });
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nomUniversite', this.universityForm.value.nomUniversite);
    formData.append('adresse', this.universityForm.value.adresse);
    formData.append('imageUrl', this.universityForm.value.imageUrl);
    // Ajoutez d'autres champs de l'université au besoin

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.httpClient.post('http://localhost:9090/universite/uploadImage', formData)
      .subscribe(response => {
        console.log('Université ajoutée avec succès!', response);
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'université', error);
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
