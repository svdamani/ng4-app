import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicDetailComponent } from "app/clinic-detail/clinic-detail.component";
import { DoctorDetailComponent } from "app/doctor-detail/doctor-detail.component";
import { ReceptionistDetailComponent } from "app/receptionist-detail/receptionist-detail.component";

const routes: Routes = [
  { path: '', children: [] },
  { path: 'clinic/:id', component: ClinicDetailComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent },
  { path: 'receptionist/:id', component: ReceptionistDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
