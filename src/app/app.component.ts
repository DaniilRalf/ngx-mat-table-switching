import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {
  NgxMatTableSwitchingService
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.service";
import {
  NgxMatTableSwitchingDirective
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.directive";
import {
  NgxMatTableSwitchingModule
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.module";

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-ngx-mat-table-switching';
  // ==== тестировал прямое подключение сервиса из библиотеки

  atgActiveTable = false

  elementData: PeriodicElement[] = [
    {name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {name: 'Helium', weight: 4.0026, symbol: 'He'},
    {name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {name: 'Boron', weight: 10.811, symbol: 'B'},
    {name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ]
  displayedColumns: string[] = ['name', 'weight', 'symbol']
  dataSource = new MatTableDataSource(this.elementData)
  // stuff = inject(NgxMatTableSwitchingDirective)

  constructor() {
  }

  ngOnInit() {
  }

  onActiveData(data: any) {
    console.log(data)
  }
  toggleCheckbox(event: any){
  }
  onEnter(event: any){
    event.preventDefault()
  }
}
