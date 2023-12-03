import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent {
  universityForm: FormGroup;
  selectedFile?: File;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.universityForm = this.fb.group({
      nomUniversite: [''],
      adresse: [''],
      imageUrl: [''],
      // Ajoutez d'autres champs de l'université au besoin
      image: ['']
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

    this.http.post('http://localhost:9090/universite/uploadImage', formData)
      .subscribe(response => {
        console.log('Université ajoutée avec succès!', response);
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'université', error);
      });
  }
}
