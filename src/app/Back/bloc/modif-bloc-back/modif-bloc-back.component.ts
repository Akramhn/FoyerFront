import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Foyer } from 'src/app/Model/foyer';
import { Universite } from 'src/app/Model/universite';
import { UniversityService } from '../../service/university.service';
import { FoyerService } from '../../service/foyer.service';
import { BlocService } from '../../service/bloc.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bloc } from 'src/app/Model/bloc';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-modif-bloc-back',
  templateUrl: './modif-bloc-back.component.html',
  styleUrls: ['./modif-bloc-back.component.css']
})
export class ModifBlocBackComponent {

  @Output() blocUpdated = new EventEmitter<void>();
  blocForm: FormGroup;
  uni: Universite[] = [];
  foyers: Foyer[] = [];
  selectedUni!: Universite;
  selectedFoyer!: Foyer;
 

  newFoyer: Foyer= new Foyer();


  constructor(
    private universiteS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private fb: FormBuilder,
    private actR: ActivatedRoute,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<ModifBlocBackComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Bloc
  ) {
    this.blocForm = this.fb.group({
      university: new FormControl('', Validators.required),
      foyer: new FormControl('', Validators.required),
      nomBloc: new FormControl('', Validators.required),
      capBloc: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getUni();
    this.populateForm();
    this.blocForm
      .get('university')
      ?.valueChanges.pipe(debounceTime(10), distinctUntilChanged())
      .subscribe((selectedUniversity) => {
        this.selectedUni =
          this.uni.find((u) => u.nomUniversite === selectedUniversity) ||
          new Universite();
        // Optionally, call other methods or perform additional actions here
        this.getFoyersByUniversity();
      });

    this.blocForm
      .get('foyer')
      ?.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((selectfoy) => {
        this.selectedFoyer =
          this.foyers.find((u) => u.nomFoyer === selectfoy) || new Foyer();
        // Optionally, call other methods or perform additional actions here
      });

   
  }

  async populateForm() {
    const universitePromise = this.data.foyer.universite.nomUniversite; // Assuming this is a promise
    const foyerPromise = this.data.foyer.nomFoyer; // Assuming this is a promise
    const blocPromise = this.data.nomBloc; // Assuming this is a promise
    const nomBloc = this.data.nomBloc; // Assuming this is synchronous
    const capBloc = this.data.capaciteBloc; // Assuming this is synchronous

    // Use Promise.all to await all promises concurrently
    const [universite, foyer] = await Promise.all([
      universitePromise,
      foyerPromise,
      
    ]);

    // Now, set the form values
    this.blocForm.patchValue({
      university: universite,
      foyer: foyer,
      nomBloc: nomBloc,
      capBloc: capBloc,
    });
  }

  getUni() {
    this.universiteS.getUniversites().subscribe((data) => {
      this.uni = data;
    });
  }

  getFoyersByUniversity(): void {
    console.log('hani lenna', this.selectedUni);
    
    this.foyers = [];
    this.FoyerS.getFoyerByUni(this.selectedUni.idUniversite).subscribe(
      (data) => {
        this.foyers.push(data);
      }
    );
  }
  
  onFormSubmit() {
    this.newFoyer.idFoyer = this.selectedFoyer!.idFoyer;
    if (this.blocForm.valid) {
      console.log(this.blocForm.value);
      

      if (this.selectedFoyer && this.blocForm.value.nomBloc) {
        const BlocToAdd: Bloc = {
          idBloc: this.data.idBloc,
          nomBloc: this.blocForm.value.nomBloc,
          capaciteBloc: this.blocForm.value.capBloc,
          Chambre:[],
          foyer:  this.newFoyer,
          
        };
        console.log('Chambre to add:', BlocToAdd);

        this.blocS.updateBloc(BlocToAdd).subscribe((data) => {
          console.log('Bloc updated successfully:', data);

          this.toastr.success(
            'Bloc updated  successfully'
          );
          this.blocUpdated.emit();
          this._dialogRef.close(true);
        });
      }
    }
  }


}
