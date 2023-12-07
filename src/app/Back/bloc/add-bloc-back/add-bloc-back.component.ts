import { Component, OnInit } from '@angular/core';
import { Foyer } from 'src/app/Model/foyer';
import { FoyerService } from '../../service/foyer.service';
import { BlocService } from '../../service/bloc.service';
import { NgForm } from '@angular/forms';
import { Bloc } from 'src/app/Model/bloc';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Universite } from 'src/app/Model/universite';
import { UniversityService } from '../../service/university.service';

@Component({
  selector: 'app-add-bloc-back',
  templateUrl: './add-bloc-back.component.html',
  styleUrls: ['./add-bloc-back.component.css']
})
export class AddBlocBackComponent implements OnInit{


  blocForm: FormGroup;

  uni: Universite[] = [];
  foyers!: Foyer;
 
  bc: Bloc[] = [];
  selectedUni: Universite | null = null;
  selectedFoyer: Foyer | null = null;
  constructor(
    private universiteS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.blocForm = this.fb.group({
      university: new FormControl('', Validators.required),
      foyer: new FormControl('', Validators.required),
      nombloc: new FormControl('', Validators.required),
      capacite: new FormControl('', Validators.required),
    });
  }
  getFoyersByUniversity(): void {
    console.log( this.selectedUni?.idUniversite);
    this.FoyerS.getFoyerByUni(this.selectedUni!.idUniversite).subscribe(
      (data) => {
        this.foyers = data;
      }
    );
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
    if (this.blocForm.valid) {
      console.log(this.blocForm.value);
      const capacitebloc: number = this.blocForm.value.capacite;
      const nombloc : string=this.blocForm.value.nombloc
      console.log('capacitebloc:', capacitebloc);
      console.log('selectedFoyer:', this.selectedFoyer);
      if (this.selectedFoyer && capacitebloc) {
        const blocToadd: Bloc = {
          idBloc:0,
          capaciteBloc: capacitebloc,
          nomBloc: nombloc,
          foyer: this.selectedFoyer,
          Chambre: [],
        };
        console.log('Bloc to add:', blocToadd);

        this.blocS.addBloc(blocToadd).subscribe((data) => {
          console.log('bloc added successfully:', data);

          this.blocS
            .affecterBlocAFoyer(data.idBloc, this.selectedFoyer!.idFoyer)
            .subscribe((data) => {
              // Handle success, if needed
              console.log('Bloc affected to foyer successfully:', data);

              // Display success notification
              this.toastr.success(
                'bloc added and affected to foyer successfully'
              );
            });
        });
      }
    }
  }


}
