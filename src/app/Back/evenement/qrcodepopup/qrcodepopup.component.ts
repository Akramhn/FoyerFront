import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evenement } from 'src/app/Model/evenement';


@Component({
  selector: 'app-qrcodepopup',
  templateUrl: './qrcodepopup.component.html',
  styleUrls: ['./qrcodepopup.component.css']
})

export class QrcodepopupComponent {
  evenement: Evenement;
  qrCodeValue: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { evenement: Evenement }) {
    this.evenement = data.evenement;
    this.qrCodeValue = `${this.evenement.nomEvenement as string} ${this.evenement.lieu as string} ${this.evenement.description as string} `;
  }
}
