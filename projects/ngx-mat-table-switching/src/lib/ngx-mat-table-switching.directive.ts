import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ngxMatTableSwitching]'
})
export class NgxMatTableSwitchingDirective implements OnInit{

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.background = 'red'
  }
}
