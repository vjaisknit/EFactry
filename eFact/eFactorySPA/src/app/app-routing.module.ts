import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ItemSeriesComponent } from './MasterComponent/item-series/item-series.component';
import { HomeComponent } from './CommonComponemt/header/Transaction/Home/Home.component';


const routes: Routes = [
                        {path : '', component: HomeComponent},
                        {path : 'login', component: LoginComponent},
                        {path : 'register', component: RegisterComponent},
                        {path : 'item-series', component: ItemSeriesComponent},
                        {path : 'home', component: HomeComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
