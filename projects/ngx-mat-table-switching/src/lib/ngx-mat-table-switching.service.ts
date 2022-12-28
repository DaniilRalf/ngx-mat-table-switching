import { Injectable } from '@angular/core';

@Injectable()

export class NgxMatTableSwitchingService {

  constructor() { }


  doStuff(): string {
    return 'stuff library';
  }

  doStuffWithInput(input: string): string {
    return input;
  }
}
