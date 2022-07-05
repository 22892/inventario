import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component'
import { Lista2Component } from './components/lista2/lista2.component'

import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './components/detalle/detalle.component'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FortawesomeModule } from 'src/app/fortawesome.module'
import { TablaestadosComponent } from './components/tablaestados/tablaestados.component'
import { SpinerComponent } from '../../init/spiner/spiner.component'
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'lista2', component: Lista2Component },

  { path: 'detalle/:vin', component: DetalleComponent },

];

@NgModule({
  declarations: [ListaComponent, Lista2Component, DetalleComponent, TablaestadosComponent, SpinerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    FontAwesomeModule,
    FortawesomeModule,
    PdfViewerModule,

  ]
})
export class PedidoModule { }
