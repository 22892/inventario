import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component'
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FortawesomeModule } from 'src/app/fortawesome.module'
import {SearchComponent } from '../remision/components/search/search.component'
import { SpinerModule } from './../../init/spiner/spiner.module'
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch'
import { NgxPaginationModule } from 'ngx-pagination';
import { VinesComponent } from './components/vines/vines.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RecepcionComponent } from './components/recepcion/recepcion.component';


const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'vines', component: VinesComponent },
  { path: 'recepcion/:guia', component: RecepcionComponent },

];


@NgModule({
  declarations: [ListaComponent,  SearchComponent, VinesComponent, RecepcionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    FontAwesomeModule,
    FortawesomeModule,
    ReactiveFormsModule,
    SpinerModule,
    NzElementPatchModule,
    NgxPaginationModule,
    PdfViewerModule,
    ScrollingModule

  ],exports: [SearchComponent]
})

export class RemisionModule { }
