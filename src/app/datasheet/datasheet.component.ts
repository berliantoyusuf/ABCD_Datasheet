import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { DatasheetService } from '../datasheet.service';
import 'rxjs/add/operator/map';
import { Question, Responses, Survey, Answer, Person, Answer1 } from '../project';

@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.css'],
  providers:[DatasheetService]
})
export class DatasheetComponent implements OnInit {

  questions: Question[];
  responses: Answer[] = [];
  respon: Responses[];
  persons: Person[];
  surveys: Survey[] = [];
  responses1: Answer1[];

  editRowID: any = '';
  showEditTable: boolean = false;
  constructor(private _http: Http, private _datasheetService: DatasheetService) { }

  clickMessage = '';

  onClickMe(id: number) {
    // this.clickMessage = 'You are my hero!';
    // console.log(this.clickMessage);

    // this._datasheetService.getQuestions(id)
    // .subscribe(questions => {
    //   this.questions = questions;
    // });

    // let ngising : number; 
    // this._datasheetService.getResponses1(1)
    //  .subscribe(responses1 => {
    //    this.responses1 = responses1;
    // },
    // null,
    // () => {
    //   ngising = this.responses1.length
    //   console.log(ngising);

    // for (let i = 1; i<=ngising; i++) {
    //   this._datasheetService.getResponses(i)
    //   .subscribe(responses => {
    //    this.responses.push(responses);
    
    //    console.log(responses);
    //     });
    //   }
    //  }
    // );
  }

  Edit(val){
    if(val == null)
    this.editRowID = val;
    else
    this.editRowID = val;
  }

  val = '';
  onEnter(val: string) { this.val = val; }

  ngOnInit(): void {

    this._datasheetService.getSurvey(1)
    .subscribe(surveys => {
     this.surveys = surveys;
    //  console.log(this.surveys);
     });

     this.getData(1);
  }

  getData(id: number){
    this.responses = [];
    // console.log(id);
    this._datasheetService.getQuestions(id)
    .subscribe(questions => {
      this.questions = questions;
      // console.log(this.questions);
    });

    let ngising : number; 
    this._datasheetService.getResponses1(id)
     .subscribe(responses1 => {
       this.responses1 = responses1;
    },
    null,
    () => {
      ngising = this.responses1.length
      // console.log(ngising);

    for (let i = 1; i<=ngising; i++) {
      this._datasheetService.getResponses(id, i)
      .subscribe(responses => {
        this.responses.push(responses);
        console.log(responses);
        });
      }
     }
    );
  
  }

  private extractData(res: Response){
    const body = res.json();
    return body.data || {};
  }
}
