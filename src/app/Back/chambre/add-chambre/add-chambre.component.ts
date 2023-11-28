import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../service/university.service';
import { Universite } from 'src/app/Model/universite';
import { Foyer } from 'src/app/Model/foyer';
import { Bloc } from 'src/app/Model/bloc';
import { Chambre } from 'src/app/Model/chambre';
import { FoyerService } from './../../service/foyer.service';
import { BlocService } from './../../service/bloc.service';
import { ChambreService } from '../../service/chambre.service';

@Component({
  selector: 'app-add-chambre',
  templateUrl: './add-chambre.component.html',
  styleUrls: ['./add-chambre.component.css'],
})
export class AddChambreComponent implements OnInit {
  uni: Universite[] = [];
  foy: Foyer[] = [];
  bloc: Bloc[] = [];
  ch: Chambre[] = [];
  constructor(
    private universiteS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private cha: ChambreService
  ) {}

  getCha() {
    this.cha.getChambres().subscribe((data) => {
      (this.ch = data), console.log(data);
    });
  }
  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
      console.log(data);
    });
  }
  getFoyer() {
    this.FoyerS.getFoyers().subscribe((data) => {
      this.foy = data;
    });
  }
  getBlocs() {
    this.blocS.getBlocs().subscribe((data) => {
      this.bloc = data;
    });
  }

  ngOnInit(): void {
    this.getUni();
    this.getFoyer();
    this.getBlocs();
  }
}
