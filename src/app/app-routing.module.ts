import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path:'' , redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  { path: 'main', loadChildren: ()=>import('./main/main.module').then(m => m.MainModule), canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
