import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  key: string = 'c16801bd504829e390fe52cd6b0ed283:2adfb2c25dd1ec6a7059c9bc9fc21d49';
}

export interface Login{
  success: boolean;
  token: string;
  key: string;
}

export interface User{
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: ImageData;
  address: string;
  phone: string;
  company: string;
  // projects: Project[];
}

export interface Project{
  id: string;
  name: string;
  description: string;
  status: boolean; // aktif atau tidak
  isDeleted: boolean; // apakah sedang terhapus atau tidak
  // created: Date;
  updated: Date;
  username: string;
  groups: string;
  // surveys: Survey[];
}

export interface Survey{
  id: string;
  name: string;
  description: string;
  created: Date;
  updated: Date;
  welcome: string;
  goodbye: string;
  theme: number;
  surveyType: string;
  isBack: boolean;
  // question_group_id: number;
  // theme: ???? Semementara dilupakan dulu
  // questions: Question[];
}

export interface Question{
  id: string;
  text: string;
  question_type: string;
  isRequired: boolean;
  updated: Date;
  isLogic: boolean;
  question_group_id: number;
  response_choices: Response_choice[];
  answers: Answer[];
}

export interface Response_choice{
  id: string;
  text: string;
  next_question_id: string;
  question_id: string;
}

export interface Questiontype {
  question_id: string;
  disabled: boolean;
  condition: string;
}

export interface Answer{
  id: number;
  answer: string;
  question_id: string;
  kuesioner_id: string;
  respondent_id: string;
  created: string;
  nomor: string;
}

export interface NotFound {
  success: boolean;
  msg: string;
}

export interface Shared {
  group_id: number;
  username: string;
}

export interface Answer1{
  id: number;
}


export interface Coba {
  project_name: string;
}

export interface Person{
  id: number;
  firstName: string;
  lastName: string;
}

export interface Responses{
  id: number;
  question_id: number;
  answer: string;
  surveyor_id: string;
  survey_response_id: number;
  respondent_id: number;
}

export interface Datasheet {
  data: string;
}