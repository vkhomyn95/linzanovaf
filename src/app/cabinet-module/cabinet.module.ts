import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CabinetRoutingModule} from './cabinet-routing-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {authInterceptorProviders} from '../interceptors/auth.interceptor';
import {backendInterceptorProviders} from '../interceptors/backend.interceptor';
import {CabinetComponent} from './components/cabinet/cabinet.component';
import {CabinetUserOrdersComponent} from './components/cabinet-user-orders/cabinet-user-orders.component';
import {UserCabinetSingleOrderComponent} from './components/user-cabinet-single-order/user-cabinet-single-order.component';
import {CabinetUserDataComponent} from './components/cabinet-user-data/cabinet-user-data.component';
import {CabinetStatisticComponent} from './components/cabinet-statistic/cabinet-statistic.component';
import {CabinetFutureComponent} from './components/cabinet-future/cabinet-future.component';
import {TrackingModalComponent} from './components/tracking-modal/tracking-modal.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    CabinetComponent,
    CabinetUserOrdersComponent,
    UserCabinetSingleOrderComponent,
    CabinetUserDataComponent,
    CabinetStatisticComponent,
    CabinetFutureComponent,
    TrackingModalComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [authInterceptorProviders, backendInterceptorProviders]
})
export class CabinetModule { }
