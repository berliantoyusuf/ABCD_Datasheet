import { Component, OnInit } from '@angular/core';
import { Person, Survey, Question, Answer, Project } from '../project';
import { Datasheet3Service } from '../datasheet3.service';
import { ProjectService } from '../datasheet1.service';
import { Datasheet1Component } from '../datasheet1/datasheet1.component';
// import fs = require('fs');

@Component({
  selector: 'app-datasheet3',
  templateUrl: './datasheet3.component.html',
  styleUrls: ['./datasheet3.component.css'],
  providers: [Datasheet3Service, ProjectService],
})
export class Datasheet3Component implements OnInit {

  loading: boolean;
  persons: Person[];
  cols: any[];
  cols1: any[];
  surveys: Survey[];
  questions: Question[];
  responses: Answer[] = [];
  panjang: number;
  isAvailable: boolean = false;
  public headers: any[];
  projects: Project[];

  respondent: any[] = [];
  tableArray: any[] = [];
  dataTable: any[] = [];
  records: any[] = [];
  name: string = "";
  public nameProyek: string = "Choose Project";
  public nameSurvey: string = "Choose Survey";

  stacked: boolean;


  constructor(private projectService: ProjectService) { }

  ngOnInit() {

    // this.cols = [
    //   {field: 'id', header: 'ID'},
    //   { field: 'text', header: 'Question' },
    //   { field: 'question_type', header: 'Type' },
    // ];

    this.projectService.getProjects("w4DgTNpCSiDs")
      .subscribe(projects => {
        this.projects = projects;
        console.log(this.projects);
      });

  }

  removeTable(){
    this.headers = [];
    this.tableArray = [];
    this.dataTable = [];
    this.records = [];
    this.responses = [];
    this.respondent = [];

    this.nameSurvey = "Choose Survey";
  }

  getSurvey(id: string) {

    this.projectService.getSurveys(id)
      .subscribe(surveys => {
        this.surveys = surveys;
        console.log(this.surveys);
      });
  }

  getData(id: string) {
    console.clear();
    this.headers = [];
    this.tableArray = [];
    this.dataTable = [];
    this.records = [];
    this.responses = [];
    this.respondent = [];

    this.projectService.getQuestions(id)
      .subscribe(questions => {
        this.questions = questions;
      },
      null,
      () => {
        if (this.questions) {
          for (let i = 0; i < this.questions.length; i++) {

            this.headers.push({ field: this.questions[i].text, header: this.questions[i].text });
          }

          for (let question of this.questions) {
            // console.log(question.id)

              this.getResponses(question.id, question)   

            // console.log(this.responses.map(item => item.respondent_id).filter((v, i, a) => a.indexOf(v) === i));
          }
          setTimeout(() => {
            this.hehe();
          }, 1000);
        }
        else {
          console.clear();
        }
      }
      );
  }

  getResponses(id: string, question: Question): void {
    let hehe: Answer[];
    // console.log(id);
    if (question) {
      // console.log(id);

      this.projectService.getResponse(id)
        .subscribe(responses => {
          
          // console.log(id);      
          hehe = Object.assign(responses);
          console.log(hehe);
          
        },
        null,
        () => {
          for (let response of hehe) {
            if (question.answers) {
              this.respondent.push(response.respondent_id);
              question.answers.push(response);
              this.responses.push(response);
              this.responses.sort((a, b) => a.nomor < b.nomor ? -1 : a.nomor > b.nomor ? 1 : 0);
            } else {
              this.respondent.push(response.respondent_id);
              question.answers = [];
              question.answers.push(response);
              this.responses.push(response);
              this.responses.sort((a, b) => a.nomor < b.nomor ? -1 : a.nomor > b.nomor ? 1 : 0);
            }
            // console.log(this.responses);
            
          }
          setTimeout(() => {
            this.isAvailable = true;
          }, 1000);
        }
        );
    }
  }

  hehe() {
    // console.log(this.respondent.map(item => item).filter((v, i, a) => a.indexOf(v) === i))
    for (let respondent of this.respondent.map(item => item).filter((v, i, a) => a.indexOf(v) === i)) {
      let answer = this.responses.filter(x => x.respondent_id === respondent)
      // console.log(answer);
      if (this.tableArray.length > 0) {
        this.tableArray = [];
        for (let i = 0; i < answer.length; i++) {
          this.tableArray.push({
            [this.headers[i].field]: answer[i].answer,
          });
        }
      } else {
        for (let i = 0; i < answer.length; i++) {
          this.tableArray.push({
            [this.headers[i].field]: answer[i].answer,
          }); 
        }
      }
      // console.log(this.tableArray)
      // console.log(this.responses)
      this.getDataTable(this.tableArray);
    }
    this.responses.sort((a, b) => a.created < b.created ? -1 : a.created > b.created ? 1 : 0);
    // console.log(this.responses);
    this.records = this.dataTable.slice();
    console.log(this.records);
  }

  
  getDataTable(data: any[]) {
    // console.log(data)
    let hehe: Answer;
    hehe = data.reduce(((x, y, i, a) => Object.assign(x, y)), {});
    // console.log(hehe);
    this.dataTable.push(hehe);
  }



  changeData(event:any) {
    const ansa: string = (event.column.field.toString());
    // console.log(event.column.field);
    console.log(event); 
    // console.log(event.data.index);
    // console.log(this.questions);

    let su = event.data[ansa];

    const indexQuestion = this.questions.findIndex(x => x.text === event.column.field);
    
    console.log(event.index);
    
    // this.responses[event.index].answer = su;
    // console.log(this.responses[event.index]);

    this.questions[indexQuestion].answers[event.index].answer = su;
    console.log(this.questions[indexQuestion]);

    this.updateResponse(this.questions[indexQuestion].answers[event.index]);
  }

  updateResponse(value: Answer) {
    console.log(value);

    this.projectService.updateResponse(value)
      .subscribe();
  }

  getName(name2: string) {
    this.name = "Kuesioner: " + name2;
  } 

  getProjectName(projectName: string, projectStatus: string) {
    if(projectStatus == '0'){
      projectStatus = 'inactive';
      this.nameProyek = projectName + " (" + projectStatus + ")";
    }
    else{
      projectStatus = '';
      this.nameProyek = projectName;
    }
    
  }

  getSurveyName(surveyName: string, surveyType: string) {
    this.nameSurvey = surveyName + " " + "(" + surveyType + ")";
    this.getName(this.nameSurvey);
  }

  toggle() {
    this.stacked = !this.stacked;
}

}
