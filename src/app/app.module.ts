import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxMatTableSwitchingModule
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,


    NgxMatTableSwitchingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
