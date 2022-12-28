import {Component, inject, OnInit} from '@angular/core';
import {
  NgxMatTableSwitchingService
} from "../../projects/ngx-mat-table-switching/src/lib/ngx-mat-table-switching.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-ngx-mat-table-switching';

  stuff = inject(NgxMatTableSwitchingService);

  ngOnInit() {
    console.log(this.stuff.doStuff());
    console.log(this.stuff.doStuffWithInput('stuff library with input'));
  }
}
