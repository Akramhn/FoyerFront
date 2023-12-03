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

@Component({
  selector: 'app-add-chambre',
  templateUrl: './add-chambre.component.html',
  styleUrls: ['./add-chambre.component.css'],
})
export class AddChambreComponent implements OnInit {
  chambForm: FormGroup;

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
    console.log('Form submitted');
    if (this.chambForm.valid) {
      console.log(this.chambForm.value);
      const numChambre: number = this.chambForm.value.numChamb;
      console.log('numChambre:', numChambre);
      console.log('selectedBloc:', this.selectedBloc);
      if (this.selectedBloc && numChambre) {
        const chambreToAdd: Chambre = {
          idChambre: 0,
          numeroChambre: numChambre,
          typeC: this.chambForm.value.typeCh,
          bloc: this.selectedBloc,
          reservation: [],
        };
        console.log('Chambre to add:', chambreToAdd);

        this.cha.addChambre(chambreToAdd).subscribe((data) => {
          console.log('Chambre added successfully:', data);

          this.blocS
            .affecterChambreABloc([data.idChambre], this.selectedBloc!.idBloc)
            .subscribe((data) => {
              // Handle success, if needed
              console.log('Chambre affected to bloc successfully:', data);

              // Display success notification
              this.toastr.success(
                'Chambre added and affected to bloc successfully'
              );
            });
        });
      }
    }
  }
}
