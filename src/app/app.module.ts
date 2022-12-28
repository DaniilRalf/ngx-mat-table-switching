import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxMatTableSwitchingModule
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxMatTableSwitchingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
