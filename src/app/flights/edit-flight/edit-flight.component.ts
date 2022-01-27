import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../models/flight.model';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss'],
})
export class EditFlightComponent implements AfterViewInit {

  @ViewChild('flightForm') flightForm: FlightFormComponent;

  flight: Flight;

  constructor(private route: ActivatedRoute,
              private toast: MatSnackBar,
              private router: Router,
              private flightsService: FlightsService) {
  }

  // tu jest już dostęp do komponentu dzieci
  ngAfterViewInit() {
    this.loadFlight();
  }

  removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
      .then(this.onRemoveSuccess.bind(this))
      .catch(this.onFailure.bind(this));
  }

  editFlight() {
    this.flightsService.editFlight(this.flight.key, this.flightForm.form.value)
      .then(this.onEditSuccess.bind(this))
      .catch(this.onFailure.bind(this));
  }

  private onEditSuccess() {
    this.router.navigate(['../']);
    this.toast.open('Edit successful', '', { panelClass: 'toast-success' });
  }

  private onRemoveSuccess() {
    this.router.navigate(['../']);
    this.toast.open('Removed', '', { panelClass: 'toast-success' });
  }

  private onFailure(error) {
    this.toast.open(error.message, '', { panelClass: 'toast-failure' });
  }

  private loadFlight() {
    this.flightsService.getFlight(this.route.snapshot.params.key)
      .pipe(
        tap(flight => this.flightForm.flight = flight),
      )
      .subscribe(flight => this.flight = flight);
  }
}
