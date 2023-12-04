import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FoyerService } from '../../service/foyer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.css']
})
export class AddFoyerComponent {

  foyerFormGroup: FormGroup;
  selectedFile?: File;
  constructor(
    private fb: FormBuilder,
    private foyerS: FoyerService,
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient ,
  //  private modalService: NgbModal
    
  ) {
    this.foyerFormGroup = this.fb.group({
      nomFoyer: [''],
      capacite: [''],
      
    });
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
  
    if (imageFile) {
      this.foyerS.addFoyerWithImage(formData, imageFile).subscribe(
        (response) => {
          this.toastr.success('Foyer ajoutée avec succès');
          this.resetForm();
         
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de foyer', error);
          this.toastr.error('Erreur lors de l\'ajout de foyer');
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }
}
