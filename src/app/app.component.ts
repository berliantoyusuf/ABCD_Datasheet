import { Component } from '@angular/core';
import {OrderListModule} from 'primeng/components/orderlist/orderlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  TableData: any = [];
  // showEditTable: boolean = false;
  editRowID: any = '';
  constructor() {
    this.TableData = [
      {id: 1, name: 'siji', mobile: '1234', email: 'siji@mail.com'},
      {id: 2, name: 'loro', mobile: '2345', email: 'loro@mail.com'},
      {id: 3, name: 'telu', mobile: '3334', email: 'telu@mail.com'},
      {id: 4, name: 'papat', mobile: '4234', email: 'papat@mail.com'},
      {id: 5, name: 'limo', mobile: '5234', email: 'limo@mail.com'},
    ];

  }

  Edit(val){
    this.editRowID = val;
  }
}
