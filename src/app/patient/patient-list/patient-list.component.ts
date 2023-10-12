import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientServiceService } from '../patient/patient-service.service';
import { Patient } from '../patient/patient-interface';

export interface PatientD {
  firstName: string;
  lastName: string;
  address: string;
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patientData: any = [];
  searchTerm: string = '';
  constructor(private _patientService: PatientServiceService) {
    this._patientService.flag$.subscribe((flag) => {
      if (flag) {
        this.getPatientsList();
      }
    });
  }

  displayedColumns = ['firstName', 'lastName', 'addressLine1', 'actions'];
  dataSource: any;

  getPatientsList() {
    this._patientService
      .getPatientList(this.searchTerm)
      .subscribe(async (data: any) => {
        this.patientData = JSON.parse(data);
        this.dataSource = new MatTableDataSource<PatientD>(this.patientData);
      });
  }
  ngOnInit(): void {
    this.getPatientsList();
  }
  editItem(e: any) {
    let id = e.id;
    this._patientService.patientDataToUpdateFn(id);
  }
  deleteItem(e: any) {
    let id = e.id;
    this._patientService.deletePatient(id).subscribe(async (data: any) => {
      this.getPatientsList();
    });
  }
  onSearchInputChange() {
    this.getPatientsList();
  }
}
