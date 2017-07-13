import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { ReceptionistDetailComponent } from './receptionist-detail/receptionist-detail.component';
import { DummyService } from "app/dummy.service";

@NgModule({
  declarations: [
    AppComponent,
    ClinicDetailComponent,
    DoctorDetailComponent,
    ReceptionistDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DummyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
