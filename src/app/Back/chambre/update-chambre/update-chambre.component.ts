  import { Component, OnInit, Inject } from '@angular/core';
  import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
  import { Bloc } from 'src/app/Model/bloc';
  import { Chambre } from 'src/app/Model/chambre';
  import { Foyer } from 'src/app/Model/foyer';
  import { Universite } from 'src/app/Model/universite';
  import { UniversityService } from '../../service/university.service';
  import { FoyerService } from '../../service/foyer.service';
  import { BlocService } from '../../service/bloc.service';
  import { ChambreService } from '../../service/chambre.service';
  import { ToastrService } from 'ngx-toastr';
  import { ActivatedRoute } from '@angular/router';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValueComponent } from './../../../front/value/value.component';

  @Component({
    selector: 'app-update-chambre',
    templateUrl: './update-chambre.component.html',
    styleUrls: ['./update-chambre.component.css'],
  })
  export class UpdateChambreComponent implements OnInit {
    chambForm: FormGroup;
    uni: Universite[] = [];
    foyers: Foyer[] = [];
    bloc: Bloc[] = [];
    ch!: Chambre;
    selectedUni!: Universite;
    selectedFoyer!: Foyer;
    selectedBloc!: Bloc;
    id!: any;
    bl = new Bloc();

    constructor(
      private universiteS: UniversityService,
      private FoyerS: FoyerService,
      private blocS: BlocService,
      private cha: ChambreService,
      private fb: FormBuilder,
      private actR: ActivatedRoute,
      private toastr: ToastrService,
      private _dialogRef: MatDialogRef<UpdateChambreComponent>,

      @Inject(MAT_DIALOG_DATA) public data: Chambre
    ) {
      this.chambForm = this.fb.group({
        university: new FormControl('', Validators.required),
        foyer: new FormControl('', Validators.required),
        bloc: new FormControl('', Validators.required),
        numChamb: new FormControl('', Validators.required),
        typeCh: new FormControl('', Validators.required),
      });
    }

    ngOnInit() {
      this.foyers.push(this.data.bloc.foyer);

      this.getUni();
      this.id = Number(this.actR.snapshot.paramMap.get('id'));
      this.cha.getChambre(this.data.idChambre).subscribe((data) => {
        this.ch = data;
        this.populateForm();
      });

      this.chambForm
        .get('university')
        ?.valueChanges.subscribe((selectedUniversity) => {
          this.selectedUni =
            this.uni.find((u) => u.nomUniversite === selectedUniversity) ||
            new Universite();

          this.getFoyersByUniversity();
        });

      this.chambForm.get('foyer')?.valueChanges.subscribe((selectedFoyer) => {
        this.selectedFoyer =
          this.foyers.find((f) => f.nomFoyer === selectedFoyer) || new Foyer();
        this.getBlocByFoyer();
      });
    }

    populateForm() {
      this.getUni();

      this.chambForm.patchValue({
        university: this.data.bloc.foyer.universite.nomUniversite,
        foyer: this.data.bloc.foyer.nomFoyer,
        bloc: this.data.bloc.nomBloc,
        numChamb: this.data.numeroChambre,
        typeCh: this.data.typeC,
      });
    }

    getUni() {
      this.universiteS.getUniversites().subscribe((data) => {
        this.uni = data;
      });
    }

    getFoyersByUniversity(): void {
      this.bloc = [];
      this.foyers = [];
      if (this.selectedUni.idUniversite == undefined) {
        this.FoyerS.getFoyerByUni(
          this.data.bloc.foyer.universite.idUniversite
        ).subscribe((data) => {
          this.foyers.push(data);
        });
      } else {
        this.FoyerS.getFoyerByUni(this.selectedUni.idUniversite).subscribe(
          (data) => {
            this.foyers.push(data);
          }
        );
      }
    }
    getBlocByFoyer(): void {
      this.bloc = []; // Clear the array before fetching new data
      if (this.selectedFoyer.idFoyer == undefined) {
        this.blocS
          .getBlocByFoyer(this.data.bloc.foyer.idFoyer)
          .subscribe((data) => {
            this.bloc = data;
          });
      } else {
        this.blocS
          .getBlocByFoyer(this.selectedFoyer.idFoyer)
          .subscribe((data) => {
            this.bloc = data;
          });
      }
    }
    onFormSubmit() {
      console.log('Form submitted');
      if (this.chambForm.valid) {
        console.log(this.chambForm.value);
        console.log('numChambre:', this.chambForm.value.numChamb);
        console.log('selectedBloc:', this.selectedBloc);
        this.bl.nomBloc = this.selectedBloc.toString();
        if (this.selectedBloc && this.chambForm.value.numChamb) {
          const chambreToAdd: Chambre = {
            idChambre: this.data.idChambre,
            numeroChambre: this.chambForm.value.numChamb,
            typeC: this.chambForm.value.typeCh,
            bloc: this.bl,
            reservation: this.data.reservation,
          };
          console.log('Chambre to add:', chambreToAdd);

          this.cha.updateChambre(chambreToAdd).subscribe(
            (data) => {
              console.log('Chambre added successfully:', data);

              this.blocS
                .affecterChambreABloc([data.idChambre], this.data.bloc.idBloc)
                .subscribe((data) => {
                  console.log('Chambre affected to bloc successfully:', data);

                  this.toastr.success(
                    'Chambre added and affected to bloc successfully'
                  );
                  this._dialogRef.close(true);
                });
            },
            (error) => {
              console.error('Error updating chambre:', error);
              // Handle error (log, display message, etc.)
            }
          );
        }
      }
    }
  }
