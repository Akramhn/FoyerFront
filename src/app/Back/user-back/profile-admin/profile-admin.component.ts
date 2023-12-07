import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etudiant } from 'src/app/Model/etudiant';
import { Universite } from 'src/app/Model/universite';
import Swal from 'sweetalert2';
import { EtudiantService } from '../../service/etudiant.service';
import { UniversiteService } from '../../service/universite.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  etudiant!: Etudiant;
  listUniversite: Universite[] = [];
  fileToUpload: Array<File> = [];

  updateForm: FormGroup;

  constructor(private etudiantService: EtudiantService, private formBuilder: FormBuilder, private universiteService: UniversiteService) {
    this.updateForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', Validators.required],
      image: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cin: [0, Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userconnect;
    this.getOneEtudiant();
    this.getAllUniversites();
  }

  getOneEtudiant() {
    this.etudiantService.getOneEtudiant(this.userconnect.id).subscribe(data => {
      this.etudiant = data;
      
      this.updateForm.patchValue({
        nom: this.etudiant.nom,
        prenom: this.etudiant.prenom,
        image: this.etudiant.image,
        email: this.etudiant.email,
        cin: this.etudiant.cin,
        dateNaissance: this.formatDateNaissance(this.etudiant.dateNaissance)
      });
    });
  }

  private formatDateNaissance(date: any): string {
    if (date instanceof Date) {
      // If it's a Date object, format it
      return formatDate(date, 'yyyy-MM-dd', 'en');
    } else if (typeof date === 'string') {
      // If it's already a string, you might want to validate or reformat it
      return date; // Or apply formatting if necessary
    } else {
      // Handle unexpected formats, or set a default value
      console.error('Unexpected date format', date);
      return ''; // or some default value
    }
  }

  getAllUniversites() {
    this.universiteService.getAllUniversites().subscribe((data: Universite[]) => {
      this.listUniversite = data;
    });
  }

  updateAdmin() {
 
      const updatedEtudiant: Etudiant = {
        ...this.etudiant,
        ...this.updateForm.value
      };
      console.log(this.updateForm.value)
      this.etudiantService.updateEtudiant(updatedEtudiant).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Information modifiée avec succès',
          showConfirmButton: false,
          timer: 3000
        });
        localStorage.setItem('userconnect', JSON.stringify(res));
        setTimeout(() => {
          window.location.href = "http://localhost:4200/admin/profile";
        }, 3000);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour',
          text: error.message
        });
      });
    } 
  

  updatePassword() {
    this.etudiantService.updatePassword(this.userconnect.id, this.updateForm.value.password).subscribe(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Mot de passe modifié avec succès'
      });

      localStorage.setItem('userconnect', JSON.stringify(res));
      setTimeout(() => {
        window.location.href = "http://localhost:4200/admin/profile";
      }, 1000);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la modification du mot de passe'
      });
    });
  }

  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
  }

  updateImgAdmin() {
    let formData = new FormData();
    formData.append("image", this.fileToUpload[0]);

    this.etudiantService.updateImage(this.userconnect.id, formData).subscribe(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 750,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      
      Toast.fire({
        icon: 'success',
        title: 'Image modifiée avec succès'
      });

      localStorage.setItem('userconnect', JSON.stringify(res));
      setTimeout(() => {
        window.location.href = "http://localhost:4200/admin/profile";
      }, 750);
    }, err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      Toast.fire({
        icon: 'error',
        title: 'Erreur lors de la mise à jour de l\'image'
      });
    });
  }
}
