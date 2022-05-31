import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';


const routes: Routes = [
  { path: '', component: MenuComponent },   
];


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,  
    ReactiveFormsModule,

  ]
})
export class MenuModule { }
