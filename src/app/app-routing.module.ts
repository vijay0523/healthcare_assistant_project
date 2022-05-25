import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { BlockchainInterfaceComponent } from './blockchain-interface/blockchain-interface.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HospitalComponent } from './hospital/hospital.component';
import { InsuranceComponent } from './insurance/insurance.component';
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
    path: 'hospital',
    component: HospitalComponent
  },
  { 
    path: 'doctor',
    component: DoctorComponent
  },
  { 
    path: 'insurance',
    component: InsuranceComponent
  },
  { path: '',   redirectTo: '/blockchain-interface', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
