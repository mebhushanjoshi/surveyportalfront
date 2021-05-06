import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TopicDataService {

  private baseUrl: string = 'http://localhost:8070/topic/';
  constructor(private httpClient: HttpClient) { }

  // constructor() { }

  getAllTopics(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}alltopics`);
  }

  getSurveyCountOnTopic(name: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}surveycountontopic/${name}`);
  }

  addTopic(name: string, description: string, surveyorId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}addtopic/${name}/${description}/${surveyorId}`, null);
  }

  removeTopic(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/removetopic/${id}`);
  }

  searchTopic(id: number) {
    return this.httpClient.get<Topic>(`${this.baseUrl}topicbyid/${id}`);
  }
}
