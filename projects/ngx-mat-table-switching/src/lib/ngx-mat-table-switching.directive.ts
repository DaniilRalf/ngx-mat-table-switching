import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";

@Directive({
  selector: '[ngxMatTableSwitching]'
})
export class NgxMatTableSwitchingDirective implements OnInit, OnDestroy{

  /** Добавляем или убираем активный класс СТРОКИ в зависимости от переменной*/
  @HostBinding('class.active-class__switching-row') activeRowTrigger = false;

  private cellData!: string

  private cellElement!: ElementRef

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

      /* * Ключ активности режима редактирования*/
      @Input() set setTagActive(data: boolean){
        if (this.type === 'table') {
          this.ngxMatTableService.tagActive = data
        }
      }
  /*? Входные параметры=================================================*/


  /*? Выходные параметры================================================*/
      @Output() onActiveData = new EventEmitter()
  /*? Выходные параметры================================================*/


  /*? Слушатели=========================================================*/
      @HostListener('document:keydown', ['$event'])
      public onEvent(event: KeyboardEvent): void {
        if (this.ngxMatTableService.tagActive) {
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
            /* * Вот на этом месте побегаемся по всем ячейкам строки, и чистим классы всех счеек перед тем как устаовит активный*/
            if (event.code === 'ArrowDown'
              || event.code === 'ArrowUp'
              || event.code === 'ArrowLeft'
              || event.code === 'ArrowRight') {
              this.clearAllCell()
            }

            /* * Эмитим нужную строку*/
            if ((event.code === 'ArrowDown' || event.code === 'ArrowUp') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              this.checkActiveCell()
            }
            if ((event.code === 'ArrowLeft') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              /* * Заполняем нужную при клике ячейку*/
              this.checkActiveCell('left')
            }
            if ((event.code === 'ArrowRight') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              /* * Заполняем нужную при клике ячейку*/
              this.checkActiveCell('right')
            }
            this.checkActiveRow()
          }

          /* * Эмитим нужную строку*/
          if (event.code === 'Enter' && this.indexRow === this.ngxMatTableService.displacementRowCounter ) {
            const activeData = {
              cell: {
                cell_element: this.cellElement,
                cell_data: this.cellData,
              },
              row: this.row,
            }
            this.onActiveData.emit(activeData)
          }
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

  checkActiveCell(direction?: string): void {
    if (direction === 'right') {
      this.plusCell()
    }
    if (direction === 'left') {
      this.minusCell()
    }

    const  childrenOfRow = this.element.nativeElement.children
    /* * Пробегаемся по классам каждой ячейки с равниваем их с массивом чтомы передали в setAvailableCell
     * * Тем самым высталяем приисходит "листание" ячеек в том порядке в коотром янас идутназвания колонок впереданном массиве */
    for (let itemChildren of childrenOfRow) {
      itemChildren.classList.forEach((item: any) => {
        if (this.availableCell && item.includes(this.availableCell[this.ngxMatTableService.displacementCellCounter])){
          itemChildren.classList.add('active-class__switching-cell')
          this.cellData = itemChildren.innerText
          this.cellElement = itemChildren
        }
      })
    }
  }

  plusCell() {
    /* * Плюсуем ячейку только если она не последняя*/
    if ((this.ngxMatTableService.displacementCellCounter + 1) !== this.availableCell?.length) {
      this.ngxMatTableService.displacementCellCounter++
    }
  }
  minusCell() {
    /* * Минусуем ячейку только если она не первая*/
    if (this.ngxMatTableService.displacementCellCounter !== 0) {
      this.ngxMatTableService.displacementCellCounter--
    }
  }
  clearAllCell() {
    const  childrenOfRow = this.element.nativeElement.children
    for (let itemChildren of childrenOfRow) {
      itemChildren.classList.remove('active-class__switching-cell')
    }
  }

  ngOnDestroy() {
  }
}
