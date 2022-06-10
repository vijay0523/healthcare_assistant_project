import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { HospitalComponent } from './hospital/hospital.component';
import { BlockchainInterfaceComponent } from './blockchain-interface/blockchain-interface.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { DoctorComponent } from './doctor/doctor.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientComponent } from './patient/patient.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { AccessControlComponent } from './patient/access-control/access-control.component';
import { PatientRecordComponent } from './doctor/patient-record/patient-record.component';
import { MedicalRecordComponent } from './patient/medical-record/medical-record.component';
import { ExplainerDashboardComponent } from './patient/explainer-dashboard/explainer-dashboard.component';
import { SafePipe } from './safe.pipe';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    DoctorComponent,
    InsuranceComponent,
    BlockchainInterfaceComponent,
    PatientComponent,
    LoginComponent,
    AccessControlComponent,
    PatientRecordComponent,
    MedicalRecordComponent,
    ExplainerDashboardComponent,
    SafePipe,
    DoctorDashboardComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
