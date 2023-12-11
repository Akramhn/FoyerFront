import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Back/service/auth.service';
import { RegisterService } from 'src/app/Back/service/register.service';
import { UniversiteService } from 'src/app/Back/service/universite.service';
import { Universite } from 'src/app/Model/universite';
import { UserRole } from 'src/app/Model/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  listUniversite: Universite[] = [];

  registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    prenom: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    cin: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/) // Utilisation d'une expression régulière pour valider exactement 8 chiffres
    ]),    image: new FormControl(''),
    universite: new FormControl('', [Validators.required]),
    dateNaissance: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  selectedFile: File | null = null;

  constructor(private router: Router, private authenticationService: AuthService,private universiteService: UniversiteService) { }

  ngOnInit(): void {
    this.getAllUniversites();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  getAllUniversites() {
    this.universiteService.getAllUniversites().subscribe((data: Universite[]) => {
      this.listUniversite = data;
    });
  }

    

  register() {
    // Your existing code
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    if (this.registerForm.valid) {
     
      const addValueToFormData = (key: string, value: any) => {
        if (value != null) {
          formData.append(key, value);
        }

      };
    
      addValueToFormData('nom', this.registerForm.get('nom')?.value);
      addValueToFormData('prenom', this.registerForm.get('prenom')?.value);
      addValueToFormData('cin', this.registerForm.get('cin')?.value);
      addValueToFormData('universite', this.registerForm.get('universite')?.value);
      addValueToFormData('dateNaissance', this.registerForm.get('dateNaissance')?.value);
      addValueToFormData('email', this.registerForm.get('email')?.value);
      addValueToFormData('password', this.registerForm.get('password')?.value);
  
      
  
      this.authenticationService.registerEtudiant(formData).subscribe(
        (response: any) => {
          // Display success message
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Vous pouvez maintenant vous connecter',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          // Handle specific error cases
          if (error.status === 400 && error.error && error.error.errors) {
            let errorMessage = 'Erreur lors de l\'inscription :<br>';
            Object.keys(error.error.errors).forEach((key: string) => {
              errorMessage += `${error.error.errors[key]}<br>`;
            });
  
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              html: errorMessage,
              footer: 'Veuillez corriger les erreurs et réessayer'
            });
          } else {
            // Display generic error message
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue lors de l\'inscription',
              footer: 'Veuillez réessayer'
            });
          }
        }
      );
    } else {
      // Display form validation errors
      let errorText = '<ul>';
  
      Object.keys(this.registerForm.controls).forEach((field: string) => {
        const control = this.registerForm.get(field);
  
        if (control?.invalid) {
          const errors = control?.errors;
          if (errors) {
            Object.keys(errors).forEach((errorKey: string) => {
              errorText += `<li>${this.getErrorMessage(field, errorKey)}</li>`;
            });
          }
        }
      });
  
      errorText += '</ul>';
  
      Swal.fire({
        icon: 'error',
        title: 'Erreur de saisie',
        html: errorText,
        footer: 'Veuillez corriger les erreurs et réessayer'
      });
    }
  }
  getErrorMessage(fieldName: string, validatorName: string): string {
    const fieldLabels: { [key: string]: string } = {
      nom: 'Nom',
      prenom: 'Prénom',
      cin: 'CIN',
      universite: 'Université',
      dateNaissance: 'Date de naissance',
      email: 'Email',
      password: 'Mot de passe'
    };
  
    const errors = this.registerForm.get(fieldName)?.errors as any;
  
    const errorMessages: { [key: string]: string } = {
      required: `${fieldLabels[fieldName]} est requis`,
      minlength: `${fieldLabels[fieldName]} doit contenir au moins ${errors?.['minlength']?.requiredLength} caractères`,
      maxlength: `${fieldLabels[fieldName]} doit contenir au maximum ${errors?.['maxlength']?.requiredLength} caractères`,
      cin: `${fieldLabels[fieldName]} doit correspondre au modèle requis`,
      email: `Veuillez saisir une adresse email valide`,
    };
  
    return errorMessages[validatorName];
  }
}
  
