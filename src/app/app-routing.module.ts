import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { BlockchainInterfaceComponent } from './blockchain-interface/blockchain-interface.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientRecordComponent } from './doctor/patient-record/patient-record.component';
import { HospitalComponent } from './hospital/hospital.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { LoginComponent } from './login/login.component';
import { AccessControlComponent } from './patient/access-control/access-control.component';
import { ExplainerDashboardComponent } from './patient/explainer-dashboard/explainer-dashboard.component';
import { MedicalRecordComponent } from './patient/medical-record/medical-record.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { 
    path: 'blockchain-interface',
    component: BlockchainInterfaceComponent
  },
  { 
    path: 'patient',
    component: PatientComponent
  },
  { 
    path: 'patient/access-control',
    component: AccessControlComponent,
  },
  { 
    path: 'patient/medical-record',
    component: MedicalRecordComponent,
  },
  { 
    path: 'patient/explainer-dashboard',
    component: ExplainerDashboardComponent,
  },
  { 
    path: 'hospital',
    component: HospitalComponent
  },
  { 
    path: 'doctor',
    component: DoctorComponent
  },
  { 
    path: 'doctor/patient-record',
    component: PatientRecordComponent
  },
  { 
    path: 'doctor/appointments',
    component: AppointmentsComponent
  },
  { 
    path: 'doctor/explainer',
    component: DoctorDashboardComponent
  },
  { 
    path: 'insurance',
    component: InsuranceComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { path: '',   redirectTo: '/patient', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
