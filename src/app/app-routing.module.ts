import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleItemComponent} from './components/single-item/single-item.component';
import {HomeComponent} from './components/home/home.component';
import {CabinetComponent} from './components/cabinet/cabinet.component';
import {AddFormComponent} from './components/add-form/add-form.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {UsersCabinetComponent} from './components/users-cabinet/users-cabinet.component';
import {SingleUserEditComponent} from './components/single-user-edit/single-user-edit.component';
import {ProductsCabinetComponent} from './components/products-cabinet/products-cabinet.component';
import {LensesCabinetComponent} from './components/lenses-cabinet/lenses-cabinet.component';
import {SingleLensEditComponent} from './components/single-lens-edit/single-lens-edit.component';
import {SolutionsCabinetComponent} from './components/solutions-cabinet/solutions-cabinet.component';
import {CareCabinetComponent} from './components/care-cabinet/care-cabinet.component';
import {SingleSolutionEditComponent} from './components/single-solution-edit/single-solution-edit.component';
import {SingleCareEditComponent} from './components/single-care-edit/single-care-edit.component';
import {CartComponent} from './components/cart/cart.component';
import {OrdersCabinetComponent} from './components/orders-cabinet/orders-cabinet.component';
import {SingleOrderEditComponent} from './components/single-order-edit/single-order-edit.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'single', component: SingleItemComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'add', component: AddFormComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'cabinet', component: CabinetComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'admin/users', component: UsersCabinetComponent
  },
  {
    path: 'admin/products', component: ProductsCabinetComponent
  },
  {
    path: 'admin/products/lenses', component: LensesCabinetComponent
  },
  {
    path: 'admin/products/solutions', component: SolutionsCabinetComponent
  },
  {
    path: 'admin/products/cares', component: CareCabinetComponent
  },
  {
    path: 'admin/orders', component: OrdersCabinetComponent
  },
  {
    path: 'admin/users/:id', component: SingleUserEditComponent
  },
  {
    path: 'admin/order/:id', component: SingleOrderEditComponent
  },
  {
    path: 'admin/products/lenses/:id', component: SingleLensEditComponent
  },
  {
    path: 'admin/products/solutions/:id', component: SingleSolutionEditComponent
  },
  {
    path: 'admin/products/cares/:id', component: SingleCareEditComponent
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
