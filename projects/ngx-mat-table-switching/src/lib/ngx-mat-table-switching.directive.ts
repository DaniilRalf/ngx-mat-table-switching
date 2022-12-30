import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {NgxMatTableSwitchingService} from "./ngx-mat-table-switching.service";

@Directive({
  selector: '[ngxMatTableSwitching]'
})
export class NgxMatTableSwitchingDirective implements OnInit{

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





  /* * Подстчет событий клика будет происходить на элементе таблицы*/
  @HostListener('document:keydown', ['$event'])
  public onEvent(event: KeyboardEvent): void {
    if (this.type === 'table') {
      console.log(event)
    }
  }





  constructor(
    private element: ElementRef,
    private ngxMatTableService: NgxMatTableSwitchingService
  ) { }

  ngOnInit() {
    // this.element.nativeElement.style.background = 'red'
  }
}
