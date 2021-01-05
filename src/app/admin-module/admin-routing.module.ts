import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersCabinetComponent} from './components/users-cabinet/users-cabinet.component';
import {ProductsCabinetComponent} from './components/products-cabinet/products-cabinet.component';
import {SpecialOffersCabinetComponent} from './components/special-offers-cabinet/special-offers-cabinet.component';
import {LensesCabinetComponent} from './components/lenses-cabinet/lenses-cabinet.component';
import {SolutionsCabinetComponent} from './components/solutions-cabinet/solutions-cabinet.component';
import {CareCabinetComponent} from './components/care-cabinet/care-cabinet.component';
import {OrdersCabinetComponent} from './components/orders-cabinet/orders-cabinet.component';
import {SingleUserEditComponent} from './components/single-user-edit/single-user-edit.component';
import {SingleOrderEditComponent} from './components/single-order-edit/single-order-edit.component';
import {SingleOfferEditComponent} from './components/single-offer-edit/single-offer-edit.component';
import {SingleLensEditComponent} from './components/single-lens-edit/single-lens-edit.component';
import {SingleSolutionEditComponent} from './components/single-solution-edit/single-solution-edit.component';
import {SingleCareEditComponent} from './components/single-care-edit/single-care-edit.component';
import {AddFormComponent} from './components/add-form/add-form.component';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent
  },
  {
    path: 'add', component: AddFormComponent
  },
  {
    path: 'users', component: UsersCabinetComponent
  },
  {
    path: 'products', component: ProductsCabinetComponent
  },
  {
    path: 'offers', component: SpecialOffersCabinetComponent
  },
  {
    path: 'products/lenses', component: LensesCabinetComponent
  },
  {
    path: 'products/solutions', component: SolutionsCabinetComponent
  },
  {
    path: 'products/cares', component: CareCabinetComponent
  },
  {
    path: 'orders', component: OrdersCabinetComponent
  },
  {
    path: 'users/:id', component: SingleUserEditComponent
  },
  {
    path: 'order/:id', component: SingleOrderEditComponent
  },
  {
    path: 'offers/:id', component: SingleOfferEditComponent
  },
  {
    path: 'products/lenses/:id', component: SingleLensEditComponent
  },
  {
    path: 'products/solutions/:id', component: SingleSolutionEditComponent
  },
  {
    path: 'products/cares/:id', component: SingleCareEditComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
