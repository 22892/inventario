import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {path:'', component: HomeComponent, children:[
  {path:'dashboard',loadChildren:() => import('../../appModules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path:'menu',loadChildren:() => import('../../appModules/menu/menu.module').then(m => m.MenuModule)},
  {path:'pedido',loadChildren:() => import('../../appModules/pedido/pedido.module').then(m => m.PedidoModule)},
  {path:'usuario',loadChildren:() => import('../../appModules/usuario/usuario.module').then(m => m.UsuarioModule)},
  {path:'observacion/:vin/:guia',loadChildren:() => import('../../appModules/observacion/observacion.module').then(m => m.ObservacionModule)},
  {path:'remision',loadChildren:() => import('../../appModules/remision/remision.module').then(m => m.RemisionModule)},
  ]},

];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,

  ]
})

export class HomeModule { }
