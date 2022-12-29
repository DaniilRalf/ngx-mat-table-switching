import { NgModule } from '@angular/core';

import { NgxMatTableSwitchingDirective } from './ngx-mat-table-switching.directive';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";
import {NgxMatTableSwitchingComponent} from "./ngx-mat-table-switching.component";

/**
 * Сервис инжектирован только на уровне данного модуля
 * В компоненте нет необходимости именно по этому логика прописана
 * в директиве а буферные переменные в сервисе
 * */

@NgModule({
  declarations: [
    NgxMatTableSwitchingComponent,
    NgxMatTableSwitchingDirective
  ],
  imports: [
  ],
  exports: [
    NgxMatTableSwitchingDirective
  ],
  providers: [NgxMatTableSwitchingService]
})
export class NgxMatTableSwitchingModule { }
