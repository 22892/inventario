import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ObservacionComponent } from './observacion.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


const routes: Routes = [
  { path: '', component: ObservacionComponent },   
];


@NgModule({
  declarations: [ObservacionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    ScrollingModule,  
    ReactiveFormsModule,

  ]
})
export class ObservacionModule { }
