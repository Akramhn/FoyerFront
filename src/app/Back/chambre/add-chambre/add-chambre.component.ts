import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Universite } from 'src/app/Model/universite';
import { Foyer } from 'src/app/Model/foyer';
import { Bloc } from 'src/app/Model/bloc';
import { Chambre } from 'src/app/Model/chambre';
import { FoyerService } from './../../service/foyer.service';
import { BlocService } from './../../service/bloc.service';
import { ChambreService } from '../../service/chambre.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.chambForm = this.fb.group({
      university: '',
      foyer: '',
      bloc: '',
      numChamb: '',
      typeCh: '',
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
}
