import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoyerService } from '../../service/foyer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Universite } from 'src/app/Model/universite';
import { UniversityService } from '../../service/university.service';
import { Foyer } from 'src/app/Model/foyer';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.css']
})
export class AddFoyerComponent {

  foyerFormGroup: FormGroup;
  selectedFile?: File;
  uni: Universite[] = [];
  selectedUni: Universite | null = null;

  constructor(
    private universiteS: UniversityService,
    private fb: FormBuilder,
    private foyerS: FoyerService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
  //  private modalService: NgbModal
    
  ) {
    this.foyerFormGroup = this.fb.group({
      university: new FormControl('', Validators.required),
      nomFoyer: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      capaciteFoyer: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      image:new FormControl('', Validators.required)
      
    });
  }

  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
      console.log("hahom hna",data);
    });
  }
  ngOnInit(): void {
    this.getUni();
  }
  resetForm() {
    this.foyerFormGroup.reset();
    this.selectedFile = undefined;
  }
  

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onAddFoyer() {
    const formData = this.foyerFormGroup.value;
    
    const imageFile = this.selectedFile;
    const idUniversite = this.selectedUni!.idUniversite;
console.log(formData);
    if (imageFile) {
      
      this.foyerS.addFoyerWithImage(formData, idUniversite, imageFile).subscribe(
        (response) => {
          this.toastr.success('Foyer ajouté avec succès');
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du foyer', error);
          this.toastr.error('Erreur lors de l\'ajout du foyer');
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
      this.toastr.warning('Veuillez sélectionner un fichier.');
    }
  }
  
  
}
