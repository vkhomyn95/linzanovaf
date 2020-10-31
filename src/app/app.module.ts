import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemsComponent } from './components/items/items.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoStepsComponent } from './components/info-steps/info-steps.component';
import { SingleItemComponent } from './components/single-item/single-item.component';
import { HomeComponent } from './components/home/home.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { CommentComponent } from './components/comment/comment.component';
import { NavToolsComponent } from './components/nav-tools/nav-tools.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CabinetStatisticComponent } from './components/cabinet-statistic/cabinet-statistic.component';
import { CabinetFutureComponent } from './components/cabinet-future/cabinet-future.component';
import { HttpClientModule} from '@angular/common/http';
import { UsersCabinetComponent } from './components/users-cabinet/users-cabinet.component';
import { SingleUserCabinetComponent } from './components/single-user-cabinet/single-user-cabinet.component';
import { SingleUserEditComponent } from './components/single-user-edit/single-user-edit.component';
import { ProductsCabinetComponent } from './components/products-cabinet/products-cabinet.component';
import { LensesCabinetComponent } from './components/lenses-cabinet/lenses-cabinet.component';
import { SingleLensEditComponent } from './components/single-lens-edit/single-lens-edit.component';
import { SolutionsCabinetComponent } from './components/solutions-cabinet/solutions-cabinet.component';
import { CareCabinetComponent } from './components/care-cabinet/care-cabinet.component';
import { SingleSolutionEditComponent } from './components/single-solution-edit/single-solution-edit.component';
import { SingleCareEditComponent } from './components/single-care-edit/single-care-edit.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersCabinetComponent } from './components/orders-cabinet/orders-cabinet.component';
import { SingleOrderEditComponent } from './components/single-order-edit/single-order-edit.component';
import {authInterceptorProviders} from './interceptors/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { AdminStatisticsComponent } from './components/admin-statistics/admin-statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsComponent,
    CartModalComponent,
    NavbarComponent,
    FooterComponent,
    InfoStepsComponent,
    SingleItemComponent,
    HomeComponent,
    CabinetComponent,
    CommentComponent,
    NavToolsComponent,
    AddFormComponent,
    PaginationComponent,
    RegisterComponent,
    LoginComponent,
    CabinetStatisticComponent,
    CabinetFutureComponent,
    UsersCabinetComponent,
    SingleUserCabinetComponent,
    SingleUserEditComponent,
    ProductsCabinetComponent,
    LensesCabinetComponent,
    SingleLensEditComponent,
    SolutionsCabinetComponent,
    CareCabinetComponent,
    SingleSolutionEditComponent,
    SingleCareEditComponent,
    CartComponent,
    OrdersCabinetComponent,
    SingleOrderEditComponent,
    AdminComponent,
    AdminStatisticsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
