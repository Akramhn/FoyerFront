import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Universite } from 'src/app/Model/universite';
import { Foyer } from 'src/app/Model/foyer';
import { Bloc } from 'src/app/Model/bloc';
import { Chambre } from 'src/app/Model/chambre';
import { FoyerService } from './../../service/foyer.service';
import { BlocService } from './../../service/bloc.service';
import { ChambreService } from '../../service/chambre.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-chambre',
  templateUrl: './add-chambre.component.html',
  styleUrls: ['./add-chambre.component.css'],
})
export class AddChambreComponent implements OnInit {
  chambForm: FormGroup;
  newFoyer: Foyer = new Foyer();

  uni: Universite[] = [];
  foyers!: Foyer;
  bloc: Bloc[] = [];
  ch: Chambre[] = [];
  selectedUni: Universite | null = null;
  selectedFoyer: Foyer | null = null;
  selectedBloc: Bloc | null = null;
  constructor(
    private universiteS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private cha: ChambreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<AddChambreComponent>
  ) {
    this.chambForm = this.fb.group({
      university: new FormControl('', Validators.required),
      foyer: new FormControl('', Validators.required),
      bloc: new FormControl('', Validators.required),
      numChamb: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      typeCh: new FormControl('', Validators.required),
    });
  }

  getCha() {
    this.cha.getChambres().subscribe((data) => {
      (this.ch = data), console.log(data);
    });
  }
  getFoyersByUniversity(): void {
    console.log(this.selectedUni?.idUniversite);
    this.FoyerS.getFoyerByUni(this.selectedUni!.idUniversite).subscribe(
      (data) => {
        this.foyers = data;
      }
    );
  }

  getBlocByFoyer(): void {
    console.log(this.selectedFoyer?.idFoyer);

    this.blocS.getBlocByFoyer(this.selectedFoyer!.idFoyer).subscribe((data) => {
      this.bloc = data;
      console.log(this.bloc);
    });
  }

  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getUni();
  }

  onFormSubmit() {
    this.newFoyer.idFoyer = this.selectedFoyer!.idFoyer;
    this.selectedBloc!.foyer = this.newFoyer;
    console.log('Form submitted');
    if (this.chambForm.valid) {
      console.log(this.chambForm.value);
      console.log('numChambre:', this.chambForm.value.numChamb);
      console.log('selectedBloc:', this.selectedBloc);
      if (this.selectedBloc && this.chambForm.value.numChamb) {
        const chambreToAdd: Chambre = {
          idChambre: 0,
          numeroChambre: this.chambForm.value.numChamb,
          typeC: this.chambForm.value.typeCh,
          bloc: this.selectedBloc,
          reservation: [],
        };
        console.log('Chambre to add:', chambreToAdd);

        this.cha.addChambre(chambreToAdd).subscribe((data) => {
          console.log('Chambre added successfully:', data);

          this.blocS
            .affecterChambreABloc(data.idChambre, this.selectedBloc!.idBloc)
            .subscribe((data) => {
              console.log('Chambre affected to bloc successfully:', data);

              this.toastr.success(
                'Chambre added and affected to bloc successfully'
              );
              this._dialogRef.close(true);
            });
        });
      }
    }
  }
}
