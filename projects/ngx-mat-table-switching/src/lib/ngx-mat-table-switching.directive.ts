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

  /* * Add or remove the active ROW class depending on the variable*/
  @HostBinding('class.active-class__switching-row') activeRowTrigger = false;

  private cellData!: string

  private cellElement!: ElementRef

  /*? Input parameters=================================================*/
      /* * The type of the element pointed to by the directive*/
      type!: 'table' | 'row'
      @Input() set setType(data: 'table' | 'row') {
        this.type = data
      }

      /* * Index ROW*/
      indexRow?: number
      @Input() set setIndexRow(data: number) {
        this.indexRow = data
      }

      /* * Content ROW*/
      row?: any
      @Input() set setRow(data: any) {
        this.row = data
      }

      /* * CELLS available for switching*/
      availableCell?: string[]
      @Input() set setAvailableCell(data: string[]){
            this.availableCell = data
      }

      /* * Edit Mode Status*/
      @Input() set setTagActive(data: boolean){
        if (this.type === 'table') {
          this.ngxMatTableService.tagActive = data
        }
      }
  /*? Input parameters=================================================*/


  /*? Output parameters================================================*/
      @Output() onActiveData = new EventEmitter()
  /*? Output parameters================================================*/


  /*? Listeners=========================================================*/
      @HostListener('document:keydown', ['$event'])
      public onEvent(event: KeyboardEvent): void {
        if (this.ngxMatTableService.tagActive) {
          /*
       * * Click events will be counted on the table element
       * * Calculate the index of the active row
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
            /* * Iterate over all the cells in the row, and clear the classes of all cells before setting active*/
            if (event.code === 'ArrowDown'
              || event.code === 'ArrowUp'
              || event.code === 'ArrowLeft'
              || event.code === 'ArrowRight') {
              this.clearAllCell()
            }

            if ((event.code === 'ArrowDown' || event.code === 'ArrowUp') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              this.checkActiveCell()
            }
            if ((event.code === 'ArrowLeft') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              this.checkActiveCell('left')
            }
            if ((event.code === 'ArrowRight') && this.indexRow === this.ngxMatTableService.displacementRowCounter) {
              this.checkActiveCell('right')
            }
            this.checkActiveRow()
          }

          /* * Emit active ROW and CELL*/
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
  /*? Listeners=========================================================*/


  constructor(
    private element: ElementRef,
    private ngxMatTableService: NgxMatTableSwitchingService
  ) { }

  ngOnInit() {
    if (this.type === 'row') {
      /* * Search how many ROWs in TABLE*/
      if (this.indexRow && this.ngxMatTableService.quantityRows < this.indexRow) {
        this.ngxMatTableService.quantityRows = this.indexRow
      }
      this.checkActiveRow()
    }

    /* * Stay active first CELL*/
    if (this.indexRow === this.ngxMatTableService.displacementRowCounter) {
      this.element.nativeElement.children[0].classList.add('active-class__switching-cell')
    }
  }

  checkActiveRow(): void {
    /* * Check index ever ROW
    * If the index matches the calculated value of the active row, mark this row as active*/
    if (this.indexRow == this.ngxMatTableService.displacementRowCounter) {
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
    /* * Iterate over the list of classes of each cell and compare them with the array that we passed to 'setAvailableCell'
     * * Thus, we expose the “paging” of the cells in the order in which we are given the names of the columns in the array passed */
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
    /* * PLUS -  CELL if it not last*/
    if ((this.ngxMatTableService.displacementCellCounter + 1) !== this.availableCell?.length) {
      this.ngxMatTableService.displacementCellCounter++
    }
  }
  minusCell() {
    /* * MINUS -  CELL if it not first*/
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
