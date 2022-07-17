import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VinobsComponent} from './vinobs.component'

@NgModule({
  declarations: [VinobsComponent],
  imports: [
    CommonModule
  ],
  exports: [VinobsComponent]
})
export class VinobsModule { }
