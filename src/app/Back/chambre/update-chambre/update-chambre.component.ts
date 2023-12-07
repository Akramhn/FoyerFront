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
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Import 'of' if not already imported

@Component({
  selector: 'app-update-chambre',
  templateUrl: './update-chambre.component.html',
  styleUrls: ['./update-chambre.component.css'],
})
export class UpdateChambreComponent implements OnInit {
  chambForm: FormGroup;
  uni: Universite[] = [];
  foyers: Foyer[] = [];
  blocs: Bloc[] = [];
  selectedUni!: Universite;
  selectedFoyer!: Foyer;
  selectedBloc!: Bloc;

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
    this.getUni();
    this.populateForm();
    this.chambForm
      .get('university')
      ?.valueChanges.pipe(debounceTime(10), distinctUntilChanged())
      .subscribe((selectedUniversity) => {
        this.selectedUni =
          this.uni.find((u) => u.nomUniversite === selectedUniversity) ||
          new Universite();
        // Optionally, call other methods or perform additional actions here
        this.getFoyersByUniversity();
      });

    this.chambForm
      .get('foyer')
      ?.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((selectfoy) => {
        this.selectedFoyer =
          this.foyers.find((u) => u.nomFoyer === selectfoy) || new Foyer();
        // Optionally, call other methods or perform additional actions here
        this.getBlocByFoyer();
      });

    this.chambForm
      .get('bloc')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((selectedblo) => {
        this.selectedBloc =
          this.blocs.find((u) => u.nomBloc === selectedblo) || new Bloc();
        // Optionally, call other methods or perform additional actions here
        this.getBlocB();
      });
  }

  async populateForm() {
    const universitePromise = this.data.bloc.foyer.universite.nomUniversite; // Assuming this is a promise
    const foyerPromise = this.data.bloc.foyer.nomFoyer; // Assuming this is a promise
    const blocPromise = this.data.bloc.nomBloc; // Assuming this is a promise
    const numChamb = this.data.numeroChambre; // Assuming this is synchronous
    const typeCh = this.data.typeC; // Assuming this is synchronous

    // Use Promise.all to await all promises concurrently
    const [universite, foyer, bloc] = await Promise.all([
      universitePromise,
      foyerPromise,
      blocPromise,
    ]);

    // Now, set the form values
    this.chambForm.patchValue({
      university: universite,
      foyer: foyer,
      bloc: bloc,
      numChamb: numChamb,
      typeCh: typeCh,
    });
  }

  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
    });
  }

  getFoyersByUniversity(): void {
    console.log('hani lenna', this.selectedUni);
    this.blocs = [];
    this.foyers = [];
    this.FoyerS.getFoyerByUni(this.selectedUni.idUniversite).subscribe(
      (data) => {
        this.foyers.push(data);
      }
    );
  }
  getBlocByFoyer(): void {
    console.log('nvdhvdfvd', this.selectedFoyer);

    this.blocs = []; // Clear the array before fetching new data

    this.blocS.getBlocByFoyer(this.selectedFoyer.idFoyer).subscribe((data) => {
      this.blocs = data;
    });
  }
  getBlocB(): void {
    console.log('bloc', this.selectedBloc);
  }

  onFormSubmit() {
    if (this.chambForm.valid) {
      console.log(this.chambForm.value);
      console.log('numChambre:', this.chambForm.value.numChamb);
      console.log('selectedBloc:', this.chambForm.getRawValue());

      console.log('selectedd uni ba3ed l bl', this.selectedUni);
      if (this.selectedBloc && this.chambForm.value.numChamb) {
        const chambreToAdd: Chambre = {
          idChambre: this.data.idChambre,
          numeroChambre: this.chambForm.value.numChamb,
          typeC: this.chambForm.value.typeCh,
          bloc: this.selectedBloc,
          reservation: this.data.reservation,
        };
        console.log('Chambre to add:', chambreToAdd);

        this.cha.updateChambre(chambreToAdd).subscribe((data) => {
          console.log('Chambre added successfully:', data);

          this.toastr.success(
            'Chambre added and affected to bloc successfully'
          );
          this._dialogRef.close(true);
        });
      }
    }
  }
}
