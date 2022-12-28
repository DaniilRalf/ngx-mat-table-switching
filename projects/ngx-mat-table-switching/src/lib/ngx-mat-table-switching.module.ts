import { NgModule } from '@angular/core';

import { NgxMatTableSwitchingDirective } from './ngx-mat-table-switching.directive';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";

/**
 * Сервис инжектирован только на уровне данного модуля
 * В компоненте нет необходимости именно по этому логика прописана
 * в директиве а буферные переменные в сервисе
 * */

@NgModule({
  declarations: [
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
