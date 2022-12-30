import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";

@Directive({
  selector: '[ngxMatTableSwitching]'
})
export class NgxMatTableSwitchingDirective implements OnInit, OnDestroy{

  /* * Добавляем или убираем активный класс СТРОКИ в зависимости от переменной*/
  // ====   добавить в документацию названия классов
  @HostBinding('class.active-class__switching-row') activeRowTrigger = false;

  /*? Входные параметры=================================================*/
      /* * Указываем тип элемента на который навешана деректива*/
      type!: 'table' | 'row'
      @Input() set setType(data: 'table' | 'row') {
        this.type = data
      }

      /* * Индекс строки*/
      indexRow?: number
      @Input() set setIndexRow(data: number) {
        this.indexRow = data
      }

      /* * Содержимое строки*/
      row?: any
      @Input() set setRow(data: any) {
        this.row = data
      }
  /*? Входные параметры=================================================*/


  /*? Выходные параметры================================================*/
  // ==== Сделать оутпут активной строки
  /*? Выходные параметры================================================*/


  /*? Слушатели=========================================================*/
      @HostListener('document:keydown', ['$event'])
      public onEvent(event: KeyboardEvent): void {
        /*
        * * Подстчет событий клика будет происходить на элементе таблицы
        * * Высчитываем индекс активной строки
        * */
        if (this.type === 'table') {

          if (event.code === 'ArrowDown' && this.ngxMatTableService.displacementCounter < this.ngxMatTableService.quantityRows ) {
            this.ngxMatTableService.displacementCounter ++
          }
          if (event.code === 'ArrowUp' && this.ngxMatTableService.displacementCounter > 0) {
            this.ngxMatTableService.displacementCounter --
          }

        }

        if (this.type === 'row') {

          if ((event.code === 'ArrowDown' || event.code === 'ArrowUp') && this.indexRow === this.ngxMatTableService.displacementCounter) {
            console.log(this.row)
          }
          this.checkActiveRow()

        }

      }
  /*? Слушатели=========================================================*/


  constructor(
    private element: ElementRef,
    private ngxMatTableService: NgxMatTableSwitchingService
  ) { }

  ngOnInit() {
    if (this.type === 'row') {
      /* * Находим колическво строк в таблице*/
      if (this.indexRow && this.ngxMatTableService.quantityRows < this.indexRow) {
        this.ngxMatTableService.quantityRows = this.indexRow
      }
      this.checkActiveRow()
    }
  }

  checkActiveRow(): void {
    /* * Сверяем индекс каждой строки
    * Если индекс совпадает с высчитаным значением активной строки, помечаем эту строку активной*/
    if (this.indexRow === this.ngxMatTableService.displacementCounter) {
      this.activeRowTrigger = true
    } else {
      this.activeRowTrigger = false
    }
  }

  ngOnDestroy() {
  }
}
