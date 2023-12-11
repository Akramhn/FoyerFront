import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QrcodepopupComponent } from 'src/app/Back/evenement/qrcodepopup/qrcodepopup.component';
import { EvenementService } from 'src/app/Back/service/evenement.service';
import { ParticipationService } from 'src/app/Back/service/participation.service';
import { Evenement } from 'src/app/Model/evenement';
import Swiper from 'swiper';



@Component({
  selector: 'app-list-evenementf',
  templateUrl: './list-evenementf.component.html',
  styleUrls: ['./list-evenementf.component.css']
})

export class ListEvenementfComponent {
  list: Evenement[] = [];
  buttonColorClass = 'not-clicked';
  disabledButtons: { [key: number]: boolean } = {};
  constructor(
    private toastr: ToastrService,
    private evenements: EvenementService,
    private _dialog: MatDialog,
    private participations: ParticipationService,
  ){} 

  ngOnInit(): void {
    this.evenements.getEvenements().subscribe((data) => {
      this.list = data;
      console.log(data);
      this.updateDisabledButtonsFromStorage();
    });
  }
  updateDisabledButtonsFromStorage() {
    this.list.forEach((event) => {
      const isDisabled = localStorage.getItem(`disabledButton_${event.idEvenement}`) === 'true';
      this.disabledButtons[event.idEvenement] = isDisabled;
    });
  }


  ngAfterViewInit() {
    // Initialize Swiper when the component is rendered
    const swiperPopular = new Swiper('.Evenement-container', {
      spaceBetween:32 ,
      grabCursor : true,
      centeredSlides : true,
      slidesPerView: 'auto',
            // Your Swiper options here
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  onAddParticipation(idEvenement: number, idEtudiant: number){
    // Check if the button for this specific event is not already disabled
    if (!this.disabledButtons[idEvenement]) {
      this.disabledButtons[idEvenement] = true;
      this.buttonColorClass = 'clicked';
      this.participations.addParticipation(idEvenement, idEtudiant).subscribe(
        (response) => {
          this.toastr.success('Participation ajoutée avec succès');
          // Store the disabled state in localStorage
          localStorage.setItem(`disabledButton_${idEvenement}`, 'true');
        },
        (error) => {
          // If there is an error, enable the button again
          this.disabledButtons[idEvenement] = false;
          this.buttonColorClass = 'not-clicked';
        }
      );
    }
  }
  openQrCodePopup(evenement: Evenement) {
    const dialogRef = this._dialog.open(QrcodepopupComponent, {
      data: { evenement }, // Pass data to the QR code popup component
      width: 'auto', // Set the width as per your requirement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The QR code popup was closed');
    });
  }
  truncateDescription(description: String, wordLimit: number): String {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    } else {
      return description;
    }
  }
}
