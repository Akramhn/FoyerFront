import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
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
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    image: new FormControl('', [Validators.required]),
    universite: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dateNaissance: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
    const formData = new FormData();

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

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authenticationService.registerEtudiant(formData).subscribe(
      (response: any) => {
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de l\'inscription',
          footer: 'Veuillez réessayer'
        });
      }
    );
  }
}
  
