import { Component, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FlightsService } from '../../core/services/flights.service';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss'],
})
export class NewFlightComponent {

  @ViewChild('flightForm') flightForm: FlightFormComponent;

  constructor(private flightsService: FlightsService,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<NewFlightComponent>) {
  }

  createFlight() {
    this.flightsService.addFlight(this.flightForm.form.value)
      .then(this.onCreatingSuccess.bind(this))
      .catch(this.onCreatingFailure.bind(this),
      );
  }

  private onCreatingSuccess() {
    this.dialogRef.close();
    this.toast.open('Flight added!', '', { panelClass: 'toast-success' });
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message, '', { panelClass: 'toast-error' });
  }
}
