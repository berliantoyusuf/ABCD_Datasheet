import { Component, OnInit, IterableDiffers } from '@angular/core';
import { sample } from 'rxjs/operator/sample';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { DatasheetService } from '../datasheet.service';
import 'rxjs/add/operator/map';
import { Question, Survey, Answer, Datasheet } from '../project';
import { ProjectService } from '../datasheet1.service';
import { AccordionModule } from 'primeng/primeng';     
import { MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-datasheet1',
  templateUrl: './datasheet1.component.html',
  styleUrls: ['./datasheet1.component.css'],
  providers: [ProjectService]
})
export class Datasheet1Component implements OnInit {

  questions: Question[];
  responses: Answer[];
  surveys: Survey[];
  iterableDiffer: any;
  changes: boolean;

  wudo: string = "Responden";



  constructor(private _http: Http, private _datasheetService: ProjectService,
    private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this._datasheetService.getSurveys("005")
      .subscribe(surveys => {
        this.surveys = surveys;
      });
    this.getData("005005");
  }

  ngDoCheck() {

  }

  getData(id: string): void {
    this._datasheetService.getQuestions(id)
      .subscribe(questions => {
        this.questions = questions;
      },
      null,
      () => {
        
      }
      );
  }

  // getResponses(id: string, question: Question): void {
  //   this._datasheetService.getResponse(id)
  //   .subscribe(res => {
  //     this.responses = res;
  //   },
  //   null,
  //   () => {
  //     for (let response of this.responses) {
  //       if (question.answers) {
  //       question.answers.push(response);
  //       } else {
  //       question.answers = [];
  //       question.answers.push(response);
  //     }
  //   }
  //   }
  // );
}


