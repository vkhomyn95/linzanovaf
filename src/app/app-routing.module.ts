import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleItemComponent} from './components/single-item/single-item.component';
import {HomeComponent} from './components/home/home.component';
import {CabinetComponent} from './components/user-cabinet-components/cabinet/cabinet.component';
import {AddFormComponent} from './admin-module/components/add-form/add-form.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {UsersCabinetComponent} from './admin-module/components/users-cabinet/users-cabinet.component';
import {SingleUserEditComponent} from './admin-module/components/single-user-edit/single-user-edit.component';
import {ProductsCabinetComponent} from './admin-module/components/products-cabinet/products-cabinet.component';
import {LensesCabinetComponent} from './admin-module/components/lenses-cabinet/lenses-cabinet.component';
import {SingleLensEditComponent} from './admin-module/components/single-lens-edit/single-lens-edit.component';
import {SolutionsCabinetComponent} from './admin-module/components/solutions-cabinet/solutions-cabinet.component';
import {CareCabinetComponent} from './admin-module/components/care-cabinet/care-cabinet.component';
import {SingleSolutionEditComponent} from './admin-module/components/single-solution-edit/single-solution-edit.component';
import {SingleCareEditComponent} from './admin-module/components/single-care-edit/single-care-edit.component';
import {CartComponent} from './components/cart/cart.component';
import {OrdersCabinetComponent} from './admin-module/components/orders-cabinet/orders-cabinet.component';
import {SingleOrderEditComponent} from './admin-module/components/single-order-edit/single-order-edit.component';
import {AdminComponent} from './admin-module/components/admin/admin.component';
import {AdminAuthGuardService} from './services/admin-auth-guard.service';
import {CabinetUserOrdersComponent} from './components/user-cabinet-components/cabinet-user-orders/cabinet-user-orders.component';
import {CabinetUserDataComponent} from './components/user-cabinet-components/cabinet-user-data/cabinet-user-data.component';
import {SpecialOffersCabinetComponent} from './admin-module/components/special-offers-cabinet/special-offers-cabinet.component';
import {InfoStepsComponent} from './components/info-steps/info-steps.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UserCabinetSingleOrderComponent} from './components/user-cabinet-components/user-cabinet-single-order/user-cabinet-single-order.component';
import {LensesComponent} from './components/tab-components/lenses/lenses.component';
import {SolutionsComponent} from './components/tab-components/solutions/solutions.component';
import {DropsComponent} from './components/tab-components/drops/drops.component';
import {SingleOfferEditComponent} from './admin-module/components/single-offer-edit/single-offer-edit.component';

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
  // {
  //   path: 'admin/add', component: AddFormComponent
  // },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'cabinet', component: CabinetComponent
  },
  {
    path: 'cabinet/orders', component: CabinetUserOrdersComponent
  },
  {
    path: 'cabinet/orders/:id', component: UserCabinetSingleOrderComponent
  },
  {
    path: 'cabinet/user', component: CabinetUserDataComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  // {
  //   path: 'admin/users', component: UsersCabinetComponent
  // },
  // {
  //   path: 'admin/products', component: ProductsCabinetComponent
  // },
  // {
  //   path: 'admin/offers', component: SpecialOffersCabinetComponent
  // },
  // {
  //   path: 'admin/products/lenses', component: LensesCabinetComponent
  // },
  // {
  //   path: 'admin/products/solutions', component: SolutionsCabinetComponent
  // },
  // {
  //   path: 'admin/products/cares', component: CareCabinetComponent
  // },
  // {
  //   path: 'admin/orders', component: OrdersCabinetComponent
  // },
  // {
  //   path: 'admin/users/:id', component: SingleUserEditComponent
  // },
  // {
  //   path: 'admin/order/:id', component: SingleOrderEditComponent
  // },
  // {
  //   path: 'admin/offers/:id', component: SingleOfferEditComponent
  // },
  // {
  //   path: 'admin/products/lenses/:id', component: SingleLensEditComponent
  // },
  // {
  //   path: 'admin/products/solutions/:id', component: SingleSolutionEditComponent
  // },
  // {
  //   path: 'admin/products/cares/:id', component: SingleCareEditComponent
  // },
  {
    path: 'steps', component: InfoStepsComponent
  },
  // {
  //   path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuardService]
  // }
  // ,
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
