import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Universite } from 'src/app/Model/universite';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from 'src/app/Back/service/university.service';
import { FoyerService } from 'src/app/Back/service/foyer.service';
import { Foyer } from 'src/app/Model/foyer';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from 'src/app/Back/service/bloc.service';
import { Chambre } from './../../../Model/chambre';
import { ChambreService } from 'src/app/Back/service/chambre.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ReservationService } from 'src/app/Back/service/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/Model/etudiant';
import { UserService } from 'src/app/Back/service/user.service';
import { EtudiantService } from 'src/app/Back/service/etudiant.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reser-test',
  templateUrl: './reser-test.component.html',
  styleUrls: ['./reser-test.component.css'],
  animations: [
    trigger('fadeInImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(7rem)' }),
        animate(
          '2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class ReserTestComponent {
  userconnect = JSON.parse(localStorage.getItem('userconnect')!);
  bookingForm!: NgForm;

  panelOpenState = false;
  selectedUniversity!: Universite;
  foyers!: Foyer;
  bloc: Bloc[] = [];
  selectedBloc: any;
  selectedChambre: any;
  etudiant!: Etudiant;

  chambres: Chambre[] = [];

  localStorageKey = 'reservationStatus';
  hasMadeReservation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uniS: UniversityService,
    private FoyerS: FoyerService,
    private blocS: BlocService,
    private ChambreS: ChambreService,
    private resS: ReservationService,
    private toastr: ToastrService,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.getOneEtudiant();
    const userId = this.userconnect?.id || ''; // Assuming userconnect has an 'id' property
    const reservationStatus = localStorage.getItem(
      `${this.localStorageKey}_${userId}`
    );

    if (reservationStatus === 'made') {
      this.hasMadeReservation = true;
    }
    this.route.params.subscribe((params) => {
      // Use the id to fetch the university
      this.uniS
        .getUniversite(params['id'])
        .subscribe((universite: Universite) => {
          this.selectedUniversity = universite;
          console.log('Selected University:', this.selectedUniversity);
          this.getFoyersByUniversity();
        });
    });
  }

  getFoyersByUniversity(): void {
    console.log(this.selectedUniversity?.idUniversite);
    this.FoyerS.getFoyerByUni(this.selectedUniversity!.idUniversite).subscribe(
      (data) => {
        this.foyers = data;
        console.log(this.foyers);
        this.getBlocByFoyer();
      }
    );
  }

  getBlocByFoyer(): void {
    console.log(this.foyers?.idFoyer);
    this.blocS.getBlocByFoyer(this.foyers!.idFoyer).subscribe((data) => {
      this.bloc = data;
      console.log('ccccc', this.bloc);
      console.log('Selected Bloc:', this.selectedBloc);
    });
  }

  getChambreByBloc(): void {
    console.log(this.selectedBloc?.idBloc);
    this.ChambreS.getChambreByBloc(this.selectedBloc!.idBloc)
      .pipe(debounceTime(10), distinctUntilChanged())
      .subscribe((data) => {
        this.chambres = data;
        console.log('Selected Chambre:', this.chambres);
      });
  }

  onBlocSelectionChange() {
    console.log('Selected Bloc:', this.selectedBloc);
    this.getChambreByBloc();
  }

  onChambre() {
    console.log('Selected Chambre:', this.selectedChambre);
  }

  getOneEtudiant() {
    console.log(this.userconnect.id);
    this.etudiantService
      .getOneEtudiant(this.userconnect.id)
      .subscribe((data) => {
        this.etudiant = data;
        console.log(this.etudiant.cin);
      });
  }

  onSubmit() {
    if (!this.userconnect) {
      // User is not connected, show a SweetAlert notification
      Swal.fire({
        title: 'Not Logged In!',
        text: 'Please log in to make a reservation.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });

      return;
    }

    if (!this.selectedChambre && !this.selectedBloc) {
      this.toastr.warning('Please fill in all the required fields.', 'warning');
      return;
    }

    if (!this.selectedChambre) {
      this.toastr.warning('Chambre Required.', 'warning');
      return;
    }

    if (!this.selectedBloc) {
      this.toastr.warning('Bloc Required.', 'warning');
      return;
    }

    this.resS
      .addReservation(this.selectedChambre.idChambre, this.etudiant.cin)
      .subscribe(
        (response) => {
          // Check the response from the server
          if (response.status === 200 || response.status === 201) {
            this.toastr.success('Reservation added successfully!', 'Success');
          } else {
            this.toastr.error('An unexpected error occurred.', 'Error');
          }
        },
        (error) => {
          console.error('Error adding reservation:', error);

          if (error.status === 400) {
            this.handleBadRequestError(error.error);
          } else if (error.status === 401) {
            this.toastr.error(
              'Unauthorized. Please log in and try again.',
              'Error'
            );
          } else {
            this.toastr.success('Reservation added successfully!', 'Success');
          }
        }
      );
  }

  handleBadRequestError(errorMessage: string) {
    switch (errorMessage) {
      case 'You already have a reservation!':
        this.toastr.warning('You already have a reservation.', 'Warning');
        break;
      case 'The selected room does not exist.':
        this.toastr.error('The selected room does not exist.', 'Error');
        break;
      case 'The selected student does not exist.':
        this.toastr.error('The selected student does not exist.', 'Error');
        break;
      default:
        this.toastr.error('An error occurred: ' + errorMessage, 'Error');
        break;
    }
  }
}
