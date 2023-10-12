import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { PatientComponent } from '../patient/patient.component';
import { PatientDetailComponent } from '../patient/patient-detail/patient-detail.component';
import { PatientListComponent } from '../patient/patient-list/patient-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    SideNavBarComponent,
    PatientComponent,
    PatientDetailComponent,
    PatientListComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MainModule {}
