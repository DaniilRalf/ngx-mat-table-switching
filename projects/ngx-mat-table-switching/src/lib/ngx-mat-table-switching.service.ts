import { Injectable } from '@angular/core';

@Injectable()

export class NgxMatTableSwitchingService {

  /* * Number of rows in the table */
  public quantityRows = 0

  /* * A line counter that changes depending on the movement of the mouse buttons and on the click on the lines */
  public displacementRowCounter = 0

  /* * The cell counter that changes depending on the movement of the mouse buttons and on the click on the lines */
  public displacementCellCounter = 0

  /* * Travel mode activity tag*/
  public tagActive!: boolean

  constructor() { }
}
