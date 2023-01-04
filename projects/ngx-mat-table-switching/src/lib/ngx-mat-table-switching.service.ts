import { Injectable } from '@angular/core';

@Injectable()

export class NgxMatTableSwitchingService {

  /* * Коллическтво строк в таблице*/
  public quantityRows = 0

  /* * Счетчик строк который изменяется в зависимости от перемещения по кномпам мыши и от клика по строчкам*/
  public displacementRowCounter = 0

  /* * Счетчик ячеек который изменяется в зависимости от перемещения по кномпам мыши и от клика по строчкам*/
  public displacementCellCounter = 0

  constructor() { }
}
