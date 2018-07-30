import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class Datasheet3Service {

  constructor(private _http:Http) { }

  private extractData(res: Response){
    const body = res.json();
    return body.data || {};
  }  

  getData(){
    return this._http.get('http://odc-abcd.com/sumuurr/data.json')
    .map(this.extractData);
  }

}
