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

const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  
];


@NgModule({
  declarations: [ListaComponent,  SearchComponent],
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
    NgxPaginationModule

  ],exports: [SearchComponent]
})

export class RemisionModule { }
