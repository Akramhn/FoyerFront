import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvenementService } from '../../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evenement } from 'src/app/Model/evenement';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-evenement',
  templateUrl: './update-evenement.component.html',
  styleUrls: ['./update-evenement.component.css']
})
export class UpdateEvenementComponent implements OnInit {
  eventForm: FormGroup;
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private evenements: EvenementService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {
    this.eventForm = this.fb.group({
      nomEvenement: [''],
      lieu: [''],
      dateEvenement: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    // Get the event ID from the route parameters
    this.eventId = this.dialogData.eventId;
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; 
      this.evenements.getEvenementById(this.eventId).subscribe(event => {
        this.eventForm.patchValue({
          nomEvenement: event.nomEvenement,
          lieu: event.lieu,
          dateEvenement: event.dateEvenement,
          description: event.description
        });
      });
    });
  }

  onUpdateEvenement() {
    const formData = this.eventForm.value;

    this.evenements.updateEvenement(this.eventId, formData).subscribe(
      (response) => {
        this.toastr.success('Événement modifié avec succès');
        // Redirect to the event details page or any other page
        this.router.navigate(['/event-details', this.eventId]);
      },
    );
  }

}
