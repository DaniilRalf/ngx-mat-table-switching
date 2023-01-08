import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxMatTableSwitchingModule
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatExpansionModule,
        MatSlideToggleModule,

        NgxMatTableSwitchingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
