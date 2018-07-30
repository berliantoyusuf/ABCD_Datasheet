import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Response } from '@angular/http';
// import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { Datasheet1Component } from './datasheet1/datasheet1.component';
import { DropdownModule } from "ngx-dropdown";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HotTableModule } from 'ng2-handsontable';
import { MessageService } from './message.service';
import { Globals } from './project';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Datasheet3Component } from './datasheet3/datasheet3.component';
import {OrderListModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    DatasheetComponent,
    Datasheet1Component,
    Datasheet3Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DropdownModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    HotTableModule,
    SharedModule,
    DataTableModule,
    OrderListModule,
    
  ],
  providers: [MessageService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
