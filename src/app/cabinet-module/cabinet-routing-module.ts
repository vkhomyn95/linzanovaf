import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CabinetComponent} from './components/cabinet/cabinet.component';
import {CabinetUserOrdersComponent} from './components/cabinet-user-orders/cabinet-user-orders.component';
import {UserCabinetSingleOrderComponent} from './components/user-cabinet-single-order/user-cabinet-single-order.component';
import {CabinetUserDataComponent} from './components/cabinet-user-data/cabinet-user-data.component';

const routes: Routes = [
  {
    path: '', component: CabinetComponent
  },
  {
    path: 'orders', component: CabinetUserOrdersComponent
  },
  {
    path: 'orders/:id', component: UserCabinetSingleOrderComponent
  },
  {
    path: 'user', component: CabinetUserDataComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule {}
