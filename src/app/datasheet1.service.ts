import { Injectable } from '@angular/core';
import { Project, Survey, Question, NotFound, Shared, Response_choice, Login, Globals, Questiontype, Answer } from './project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { PROJECTS } from './project-data';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Response } from '@angular/http/src/static_response';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable()

export class ProjectService {
    private projectUrl: any = 'http://www.api.odc-abcd.com/project';
    private shareUrl: any = 'http://www.api.odc-abcd.com/share/project';
    private kuesionerUrl: any = 'http://www.api.odc-abcd.com/kuesioner';
    private questionUrl: any = 'http://www.api.odc-abcd.com/question';
    private resChoiceUrl: any = 'http://www.api.odc-abcd.com/res-choice';
    private responseUrl: any = 'http://www.api.odc-abcd.com/response';

    private subject = new Subject<any>();
   
    private idSource: any = new BehaviorSubject('');
    private nameSource: any = new BehaviorSubject('');
    private changeConditionSource: any = new BehaviorSubject('');
    private destroySource: any = new BehaviorSubject('');
    currentID: any = this.idSource.asObservable();
    currentName: any = this.nameSource.asObservable();
    currentCondition: any = this.changeConditionSource.asObservable();
    currentDestroy: any = this.destroySource.asObservable();
    
    key: string = this.globals.key;

    headersLogin: any = new Headers({ 'Content-Type': 'application/json' });
    optionsLogin: any = new RequestOptions({ headers: this.headersLogin });

    headers: any = new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.key}` });
    options: any = new RequestOptions({ headers: this.headers });

    public activeProject: ReplaySubject<any> = new ReplaySubject(1);
    
    constructor(
        private _http: Http,
        private http: HttpClient,
        private messageService: MessageService,
        private globals: Globals,
    ) {
        if (this.globals.key === '') {
            this.key = this.globals.key;
        }
    }

    extractData(res: Response) {
        let body: any = res.json();
        return body.data || {};
    }

    sendName(name: string) {
        this.idSource.next(name);
    }

    sendId(id: string) {
        this.idSource.next(id);
    }

    changeOnBuild(data: number) {
        this.changeConditionSource.next(data);
    }

    destroyComponent(data: Response_choice[]) {
        this.destroySource.next(data);
    }

    // Login & Register
    authenticateUser(login: Login): Observable<Login> {
        return this._http.post('http://www.api.odc-abcd.com/login', login, this.optionsLogin)
            .map(res => res.json())
            .pipe(
            catchError(this.handleError<Login>('Login')),
        );
    }

    // Bagian Project DONE
    getProjects(key: string): Observable<Project[]> {
        return this._http.get(this.projectUrl, this.options)
            .map((res: Response) => res.json() as Project[])
            .pipe(
            catchError(this.handleError('getProjects', [])),
        );
    }

    getProject(id: string): Observable<Project[]> {
        const url: any = `${this.projectUrl}/${id}`;
        return this._http.get(url, this.options)
            .map((res: Response) => res.json())
            .pipe(
            catchError(this.handleError('getProject')),
        );
    }


    // Bagian Survey DONE
    getSurveys(id: string): Observable<Survey[]> {
        const url: any = `${this.kuesionerUrl}/${id}`;
        return this._http.get(url, this.options)
            .map((res: Response) => res.json())
            .pipe(
            catchError(this.handleError('getSurveys', [])),
        );
    }

    getSurvey(id: string): Observable<Survey> {
        const url: any = `${this.kuesionerUrl}/single/${id}`;
        return this._http.get(url, this.options)
            .map((res: Response) => res.json())
            .pipe(
            catchError(this.handleError('getSurvey')),
        );
    }

    // Bagian Question DONE
    getQuestions(id: string): Observable<Question[]> {
        const url: any = `${this.questionUrl}/${id}`;
        return this._http.get(url, this.options)
            .map((res: Response) => res.json())
            .pipe(
            catchError(this.handleError('getQuestions', [])),
        );
    }

    // Bagian Response
    addResponse(response: Answer[]) {
        return this._http.post(this.responseUrl, response, this.options)
            .pipe(
            catchError(this.handleError<Response_choice>('addResponse')),
        );
    }

    getResponse(id: string): Observable<Answer> {
      const url: any = `${this.responseUrl}/${id}`;
      return this._http.get(url, this.options)
          .map((res: Response) => res.json())
          .pipe(
          catchError(this.handleError('getAnswer', [])),
          );
    }

    updateResponse(response: Answer) {
        console.log(response);
        
        return this.http.put(this.responseUrl, response, this.options)
            .pipe(
            catchError(this.handleError('updateResponse', [])),
            );
            // console.log(this.options);
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
        this.messageService.add('Project Service: ' + message);
    }

}
