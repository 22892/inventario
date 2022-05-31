import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component'
import { NuevoComponent } from './components/nuevo/nuevo.component'
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';


const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'nuevo', component: NuevoComponent },
];


@NgModule({
  declarations: [ListaComponent, NuevoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule,

  ]
})
export class UsuarioModule { }
