import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-update-chambre',
  templateUrl: './update-chambre.component.html',
  styleUrls: ['./update-chambre.component.css'],
})
export class UpdateChambreComponent implements OnInit {
  chambForm: FormGroup;
  uni: Universite[] = [];
  foyers!: Foyer;
  bloc: Bloc[] = [];
  ch!: Chambre;
  selectedUni: Universite | null = null;
  selectedFoyer: Foyer | null = null;
  selectedBloc: Bloc | null = null;
  id!: any;

  constructor(
    private universiteS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private cha: ChambreService,
    private fb: FormBuilder,
    private actR: ActivatedRoute,
    private toastr: ToastrService
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
    this.id = Number(this.actR.snapshot.paramMap.get('id'));
    this.cha.getChambre(this.id).subscribe((data) => {
      this.ch = data;
      this.populateForm();
    });

    // Subscribe to changes in university to get foyers
    this.chambForm
      .get('university')
      ?.valueChanges.subscribe((selectedUniversity) => {
        this.selectedUni =
          this.uni.find((u) => u.nomUniversite === selectedUniversity) || null;
        this.getFoyersByUniversity();
      });
  }

  populateForm() {
    this.chambForm.patchValue({
      university: this.ch.bloc.foyer.universite.nomUniversite,
      foyer: this.ch.bloc.foyer.nomFoyer,
      bloc: this.ch.bloc.nomBloc,
      numChamb: this.ch.numeroChambre,
      typeCh: this.ch.typeC,
    });
    const selectedUniversity = this.ch.bloc.foyer.universite.nomUniversite;
    this.selectedUni =
      this.uni.find((u) => u.nomUniversite === selectedUniversity) || null;

    if (this.selectedUni) {
      this.getFoyersByUniversity();

      // Set the default value for foyer directly
      this.chambForm.patchValue({ foyer: this.ch.bloc.foyer });
    }
  }

  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
    });
  }

  getFoyersByUniversity(): void {
    console.log(this.selectedUni?.idUniversite);
    if (this.selectedUni) {
      this.FoyerS.getFoyerByUni(this.selectedUni.idUniversite).subscribe(
        (data) => {
          this.foyers = data;
        }
      );
    }
  }

  getBlocByFoyer(): void {
    if (this.selectedFoyer) {
      this.blocS
        .getBlocByFoyer(this.selectedFoyer.idFoyer)
        .subscribe((data) => {
          this.bloc = data;
        });
    }
  }
}
