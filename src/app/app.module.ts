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
import { CommentComponent } from './components/comment/comment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import {authInterceptorProviders} from './interceptors/auth.interceptor';
import { HotPropositionComponent } from './components/hot-proposition/hot-proposition.component';
import { WarningBannerComponent } from './components/warning-banner/warning-banner.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LensesComponent } from './components/tab-components/lenses/lenses.component';
import { SearchComponent } from './components/tab-components/search/search.component';
import { SolutionsComponent } from './components/tab-components/solutions/solutions.component';
import { DropsComponent } from './components/tab-components/drops/drops.component';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CartDialogSuccessComponent } from './components/cart-dialog-success/cart-dialog-success.component';
import {backendInterceptorProviders} from './interceptors/backend.interceptor';


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
    CommentComponent,
    PaginationComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    HotPropositionComponent,
    WarningBannerComponent,
    NotFoundComponent,
    LensesComponent,
    SearchComponent,
    SolutionsComponent,
    DropsComponent,
    SessionModalComponent,
    CartDialogSuccessComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [authInterceptorProviders, backendInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
