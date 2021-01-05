import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleItemComponent} from './components/single-item/single-item.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {CartComponent} from './components/cart/cart.component';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';
import {InfoStepsComponent} from './components/info-steps/info-steps.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LensesComponent} from './components/tab-components/lenses/lenses.component';
import {SolutionsComponent} from './components/tab-components/solutions/solutions.component';
import {DropsComponent} from './components/tab-components/drops/drops.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'not', component: NotFoundComponent,
  },
  {
    path: 'lenses', component: LensesComponent,
  },
  {
    path: 'solutions', component: SolutionsComponent,
  },
  {
    path: 'cares', component: DropsComponent,
  },
  {
    path: 'product/:name', component: SingleItemComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'steps', component: InfoStepsComponent
  },
  {
   path: 'cabinet',
   loadChildren: () => import('./cabinet-module/cabinet.module').then(c => c.CabinetModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-module/admin.module').then(a => a.AdminModule),
    canActivate: [AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
