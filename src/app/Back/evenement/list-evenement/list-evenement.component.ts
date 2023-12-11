import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/Model/evenement';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvenementService } from '../../service/evenement.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalEvenementComponent } from '../add-modal-evenement/add-modal-evenement.component';
import { UpdateEvenementComponent } from '../update-evenement/update-evenement.component';
import { ParticipationService } from '../../service/participation.service';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodepopupComponent } from '../qrcodepopup/qrcodepopup.component';




@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent {
  searchTerm: string = '';
  disabledButtons: { [key: number]: boolean } = {};
  buttonColorClass = 'not-clicked';
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  
  list: Evenement[] = [];
  constructor(
    private evenements: EvenementService,
    private participations: ParticipationService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.evenements.getEvenements().subscribe((data) => {
      (this.list = data), console.log(data);
    });
    this.evenements.getEvenements().subscribe((data) => {
      this.list = data;
      // Update disabledButtons based on stored state
      this.updateDisabledButtonsFromStorage();
    });
  }
  updateDisabledButtonsFromStorage() {
    this.list.forEach((event) => {
      const isDisabled = localStorage.getItem(`disabledButton_${event.idEvenement}`) === 'true';
      this.disabledButtons[event.idEvenement] = isDisabled;
    });
  }
  onDelete(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?', 
    );

    if (isConfirmed) {
      this.evenements.deleteEvenement(id).subscribe((res) => {
        this.toastr.success('Deleted Successfully');

        
        setTimeout(() => {
          location.reload(); 
        }, 500);
      });
    } else {
      console.log('Deletion canceled by user');
    }
  }
  getEvenements() {
    this.evenements.getEvenements().subscribe((data) => {
      (this.list = data), console.log(data);
    });
  }
  getEvenement(id:number){
    this.evenements.getEvenementById(id).subscribe((data) => {
     
    });
  }


  openModalAddEvenementForm() {
    const dialogRef = this._dialog.open(AddModalEvenementComponent);
    dialogRef.afterClosed().subscribe((data) => {       
      
    });
    
  }
  onUpdate(data: Evenement) {
    this._dialog.open(UpdateEvenementComponent, { data });
    console.log("data" , data);
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
  searchByNom(nomEvenement: string) {
    this.evenements.searchEvenementByNom(nomEvenement).subscribe((data) => {
      this.list = data;
    });
  }

  // Call this method when you want to search by name
  onSearchByName(nomEvenement: string) {
    if (nomEvenement) {
      this.searchByNom(nomEvenement);
    } else {
      // If the search input is empty, get all events
      this.getEvenements();
    }
  }
}
