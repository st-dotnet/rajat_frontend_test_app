import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PatientComponent } from '../patient/patient.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,children: [
      { path: '', redirectTo: 'patient', pathMatch: 'full' },
      { path: 'patient', component: PatientComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
