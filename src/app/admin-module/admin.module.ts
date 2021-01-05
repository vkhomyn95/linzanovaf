import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminComponent} from './components/admin/admin.component';
import {AddFormComponent} from './components/add-form/add-form.component';
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
import {AdminStatisticsComponent} from './components/admin-statistics/admin-statistics.component';
import {authInterceptorProviders} from '../interceptors/auth.interceptor';
import {backendInterceptorProviders} from '../interceptors/backend.interceptor';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [
    AdminComponent,
    AdminStatisticsComponent,
    AddFormComponent,
    UsersCabinetComponent,
    ProductsCabinetComponent,
    SpecialOffersCabinetComponent,
    LensesCabinetComponent,
    SolutionsCabinetComponent,
    CareCabinetComponent,
    OrdersCabinetComponent,
    SingleUserEditComponent,
    SingleOrderEditComponent,
    SingleOfferEditComponent,
    SingleLensEditComponent,
    SingleSolutionEditComponent,
    SingleCareEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [authInterceptorProviders, backendInterceptorProviders]
})
export class AdminModule { }
