import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component'
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './components/detalle/detalle.component'


const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'detalle/:vin', component: DetalleComponent },
];

@NgModule({
  declarations: [ListaComponent, DetalleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PedidoModule { }
