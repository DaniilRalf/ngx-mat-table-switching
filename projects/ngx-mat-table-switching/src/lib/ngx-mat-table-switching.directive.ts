import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";

@Directive({
  selector: '[ngxMatTableSwitching]'
})
export class NgxMatTableSwitchingDirective implements OnInit, OnDestroy{

  /** Добавляем или убираем активный класс СТРОКИ в зависимости от переменной*/
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

      /* * Доступные для переключения ячейки*/
      availableCell?: string[]
      @Input() set setAvailableCell(data: string[]){
            this.availableCell = data
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

          if (event.code === 'ArrowDown' && this.ngxMatTableService.displacementRowCounter < this.ngxMatTableService.quantityRows ) {
            this.ngxMatTableService.displacementRowCounter ++
          }
          if (event.code === 'ArrowUp' && this.ngxMatTableService.displacementRowCounter > 0) {
            this.ngxMatTableService.displacementRowCounter --
          }

        }


        if (this.type === 'row') {

          /* * Эмитим нужную строку*/
          if ((event.code === 'ArrowDown' || event.code === 'ArrowUp') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
            // ==== добавить тут эмитор нужной строки
            // console.log(this.row)
          }
          if ((event.code === 'ArrowRight' || event.code === 'ArrowLeft') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
            /* * Заполняем нужную при клике ячейку*/
            this.checkActiveCell()
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
    /* * Эмитим нужную строку*/
    if (this.indexRow === this.ngxMatTableService.displacementRowCounter) {
      // ==== добавить тут эмитор нужной строки
      // console.log(this.row)
    }

    if (this.type === 'row') {
      /* * Находим колическво строк в таблице*/
      if (this.indexRow && this.ngxMatTableService.quantityRows < this.indexRow) {
        this.ngxMatTableService.quantityRows = this.indexRow
      }
      this.checkActiveRow()
    }

    /* * Заполняем первую ячейку*/
    if (this.indexRow === this.ngxMatTableService.displacementRowCounter) {
      this.element.nativeElement.children[0].classList.add('active-class__switching-cell')
    }
  }

  checkActiveRow(): void {
    /* * Сверяем индекс каждой строки
    * Если индекс совпадает с высчитаным значением активной строки, помечаем эту строку активной*/
    if (this.indexRow === this.ngxMatTableService.displacementRowCounter) {
      this.activeRowTrigger = true
    } else {
      this.activeRowTrigger = false
    }
  }

  checkActiveCell(): void {
    // ==== сделать отдельный лисьнер для кнопок влево в право
    this.ngxMatTableService.displacementCellCounter++
    // console.log(this.element)
    // console.log(this.row)
    // ==== ну и самое сложное ебануть тут преобразования

    const  childrenOfRow = this.element.nativeElement.children
    let index = 0;


    // ====переделать эту херню с поиска индекса на поиск названия класса
    for (let itemChildren of childrenOfRow) {
      itemChildren.classList.remove('active-class__switching-cell')
    }
    for (let itemChildren of childrenOfRow) {
      if (this.ngxMatTableService.displacementCellCounter === index) {
        itemChildren.classList.add('active-class__switching-cell')
      }
      console.log(this.ngxMatTableService.displacementCellCounter)
      console.log(index)
      index++
    }

    // ==== пример добавления класса на ячейку, добавить логику
    // console.log(this.element.nativeElement.children[0].classList)
    // this.element.nativeElement.children[0].classList.add('active-class__switching-cell')
  }

  ngOnDestroy() {
  }
}
