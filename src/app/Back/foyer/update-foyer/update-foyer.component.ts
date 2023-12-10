import { Component,Inject, OnInit  } from '@angular/core';
import { FoyerService } from '../../service/foyer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Foyer } from 'src/app/Model/foyer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UniversiteService } from '../../service/universite.service';
import { Universite } from 'src/app/Model/universite';
import { UniversityService } from '../../service/university.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-foyer',
  templateUrl: './update-foyer.component.html',
  styleUrls: ['./update-foyer.component.css'],
})
export class UpdateFoyerComponent  implements OnInit {
  idFoyer?: number ;
  idUniversite?: number;
  capaciteFoyer?: number;
  image?: File;
  selectedUni?: any;
  uni: Universite[] = [];
  nomFoyer: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private foyerService: FoyerService,
    @Inject(MAT_DIALOG_DATA) public data: Foyer,private universiteS : UniversityService,    private _dialogRef: MatDialogRef<UpdateFoyerComponent>,
    private toastr: ToastrService,

  ) {
    this.route.params.subscribe(params => {
      this.idFoyer = +params['idFoyer'];
      this.idUniversite = +params['idUniversite'];

    });
  }
  ngOnInit(): void {
    this.getUni();
    this.idFoyer=this.data.idFoyer;
    this.nomFoyer = this.data.nomFoyer;
    this.capaciteFoyer = this.data.capaciteFoyer;
    this.selectedUni = this.data.universite.nomUniversite;
    console.log('nomFoyer:', this.nomFoyer);
    console.log('capaciteFoyer:', this.capaciteFoyer);
    console.log('selectedUni:', this.selectedUni);
  }
    getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
      console.log(data);
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  

  onSubmit() {
    this.selectedUni = this.uni.find((u) => u.nomUniversite === this.selectedUni);
    console.log('selectedUni: submit ', this.selectedUni);
console.log("selected id ",    this.selectedUni.idUniversite,)
    this.foyerService
      .updateFoyer(
        this.nomFoyer=this.nomFoyer!,
        this.capaciteFoyer!,
        this.image!,
        this.idFoyer!,
        this.selectedUni.idUniversite,
      
      )
      .subscribe(
        (updatedFoyer) => {
          this.toastr.success('Université ajoutée avec succès');
          this._dialogRef.close(true);
        }
      );
  }
  
  
  
  
}
