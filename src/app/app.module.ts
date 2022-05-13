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

@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    DoctorComponent,
    InsuranceComponent,
    BlockchainInterfaceComponent,
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
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
