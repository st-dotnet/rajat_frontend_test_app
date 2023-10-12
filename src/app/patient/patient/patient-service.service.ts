import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Patient } from './patient-interface';
import { ErrorHandlerService } from 'src/app/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PatientServiceService {
  private apiUrl = 'https://localhost:7100'; //Change

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private flagSubject = new BehaviorSubject<boolean>(false);
  flag$ = this.flagSubject.asObservable();

  setFlag(flag: boolean) {
    this.flagSubject.next(flag);
  }
  patientDataToUpdate: EventEmitter<any> = new EventEmitter<any>();
  patientDataToUpdateFn(data: any) {
    this.patientDataToUpdate.emit(data);
  }

  public getPatientList(searchString: string): Observable<string> {
    var data = { searchByFirstName: searchString };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.apiUrl + `/api/Patient/getAll`, data, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
  public getPatientById(id: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(this.apiUrl + `/api/Patient/${id}`, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
  public addPatient(patientData: Patient): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.apiUrl + '/api/Patient', patientData, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
  public updatePatient(
    patientId: number,
    patientData: Patient
  ): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put(this.apiUrl + `/api/Patient/${patientId}`, patientData, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
  public deletePatient(id: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .delete(this.apiUrl + `/api/Patient/${id}`, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
