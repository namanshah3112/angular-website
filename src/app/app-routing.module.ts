import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './space/home/home.component';
import { LoginComponent } from './space/login/login.component';
import { RegisterComponent } from './space/register/register.component';

const routes: Routes = [
  {path:'work',loadChildren:()=>import('../app/space/space.module').then(m => m.SpaceModule)},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
