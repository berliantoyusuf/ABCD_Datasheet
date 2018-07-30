import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PROJECTS } from './project-data';
import { Http, Headers, RequestOptions, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
// import { MessageService } from './message.service';
import { Project, Survey, Question, NotFound, Shared, Response_choice, Answer, Answer1 } from './project';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '@angular/http/src/static_response';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class DatasheetService {

  private questionsUrl: any = 'http://localhost:1337';
  private responsesUrl: any = 'http://localhost:1337/responses';
  private surveyUrl: any = 'http://localhost:1337/survey';
  private responses1Url: any = 'http://localhost:1337/responses1';
  
  headers: any = new Headers({ 'Content-Type': 'application/json' });
  options: any = new RequestOptions({ headers: this.headers });

  public activeProject: ReplaySubject<any> = new ReplaySubject(1);
  
  constructor(
    private _http : Http,
    private http: HttpClient,) { }

  private extractData(res: Response){
    const body = res.json();
    return body.data || {};
  }  

  getQuestions(id: number): Observable<Question[]> {
    const url: any = `${this.questionsUrl}/${id}`;
    return this._http.get(url, this.options)
        .map((res: Response) => res.json())
        .pipe(
        catchError(this.handleError('getQuestions', [])),
    );
  }

  getResponses( id: number, respon: number ): Observable<Answer> {
    const url: any = `${this.responsesUrl}/${id}/${respon}`;
    return this._http.get(url, this.options)
        .map((res: Response) => res.json())
        .pipe( 
        catchError(this.handleError('getResponses', [])),
    );
  }

  getResponses1(id: number): Observable<Answer1[]> {
    const url: any = `${this.responses1Url}/${id}`;
    return this._http.get(url, this.options)
        .map((res: Response) => res.json())
        .pipe(
        catchError(this.handleError('getResponses1', [])),
    );
  }

  getSurvey(id: number): Observable<Survey[]> {
    const url: any = `${this.surveyUrl}/${id}`;
    return this._http.get(url, this.options)
        .map((res: Response) => res.json())
        .pipe(
        catchError(this.handleError('getSurvey', [])),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
  };
}

  private log(message: string) {
  // this.messageService.add('Project Service: ' + message);
  }

  getData(){
    return this._http.get('http://odc-abcd.com/sumuurr/data.json')
    .map(this.extractData)
  }

}
