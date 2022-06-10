import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule,FaIconLibrary,} from '@fortawesome/angular-fontawesome';
import { faSquare, faCalculator, faCameraRotate, faCar, faCheckSquare,
faArrowAltCircleRight, faCarCrash, faCut, faArchive, faBattery, faCarSide,
faFileInvoice } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class FortawesomeModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare, 
      faCalculator, 
      faCameraRotate,
      faCar,
      faArrowAltCircleRight,
      faCarCrash,
      faCut,
      faArchive,
      faBattery,
      faCarSide,
      faFileInvoice   
    );
  }
}
