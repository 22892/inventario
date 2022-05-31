import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:() => import('./init/login/login.module').then(m => m.LoginModule)},
  {path:'login',loadChildren:() => import('./init/login/login.module').then(m => m.LoginModule)},
  {path:'',loadChildren:() => import('./init/home/home.module').then(m => m.HomeModule)},
 
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
