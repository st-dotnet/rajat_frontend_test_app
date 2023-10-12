import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientServiceService } from '../patient/patient-service.service';
import { Patient } from '../patient/patient-interface';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
})
export class PatientDetailComponent implements OnInit {
  patientData: any = [];
  patientId: any;
  isEdit: boolean = false;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _patientService: PatientServiceService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [
        '',
        [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)],
      ],
    });
  }

  ngOnInit(): void {
    this._patientService.patientDataToUpdate.subscribe((id: any) => {
      if (id) {
        this.isEdit = true;
        this.patientId = id;
      }
      this.getPatientById(id);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let patient: Patient;
      patient = this.form.value;
      if (this.isEdit) {
        this.updatePatient(this.patientId, patient);
      } else {
        this.addPatient(patient);
      }
    }
  }
  addPatient(patient: Patient) {
    this._patientService.addPatient(patient).subscribe(async (data: any) => {
      this._patientService.setFlag(true);
      this.isEdit = false;
      this.patientData = [];
      this.patientId = null;
      this.form.reset();
    });
  }
  getPatientById(id: number) {
    this._patientService.getPatientById(id).subscribe(async (data: any) => {
      this.patientData = JSON.parse(data);
      this.bindDataToForm();
    });
  }
  bindDataToForm() {
    this.form.patchValue({
      firstName: this.patientData.firstName,
      lastName: this.patientData.lastName,
      phone: this.patientData.phone,
      email: this.patientData.email,
      addressLine1: this.patientData.addressLine1,
      addressLine2: this.patientData.addressLine2,
      city: this.patientData.city,
      state: this.patientData.state,
      zipcode: this.patientData.zipCode,
    });
  }
  updatePatient(id: number, patient: Patient) {
    this._patientService
      .updatePatient(id, patient)
      .subscribe(async (data: any) => {
        this._patientService.setFlag(true);
        this.isEdit = false;
        this.patientData = [];
        this.patientId = null;
        this.form.reset();
      });
  }
}
