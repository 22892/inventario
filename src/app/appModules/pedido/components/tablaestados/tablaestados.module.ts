import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TablaestadosComponent } from './tablaestados.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FortawesomeModule } from 'src/app/fortawesome.module'


@NgModule({
  declarations: [TablaestadosComponent],
  imports: [
   
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    FontAwesomeModule,
    FortawesomeModule

    
  ],exports: [TablaestadosComponent]
})
export class TablaestadosModule { }
