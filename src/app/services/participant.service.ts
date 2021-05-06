import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ParticipantDataService {

  private baseUrl: string = 'http://localhost:8070/participant/';
  constructor(private httpClient: HttpClient) { }

  // constructor() { }

  getAllParticipant(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}allparticipant`);
  }
  addParticipant(firstName: string, lastName: string, username: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add/${firstName}/${lastName}/${username}`, null);
  }

  updateParticipant(id: number ,firstName: string, lastName: string, username: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}update/${id}/${firstName}/${lastName}/${username}`, null);
  }

  removeParticipant(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  searchParticipant(id: number) {
    return this.httpClient.get<Participant>(`${this.baseUrl}/${id}`);
  }
}