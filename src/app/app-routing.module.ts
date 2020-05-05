import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component'
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SelectGenderComponent } from './auth/questionnaire/select-gender/select-gender.component';
import { MenQsComponent } from './auth/questionnaire/men-qs/men-qs.component';
import { WomenQsComponent } from './auth/questionnaire/women-qs/women-qs.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegistrationComponent
  },

  {
    path: 'menqs',
    component: MenQsComponent
  },
  {
    path: 'womenqs',
    component: WomenQsComponent
  },
  {
    path: 'select-gender',
    component: SelectGenderComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }