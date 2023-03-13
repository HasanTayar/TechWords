import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsComponent } from './products/products.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: "home"},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'cart', component: CartComponent},
  { path:'catalog', component: CatalogComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: "login"},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'userdetails/:mail', component: UserdetailsComponent },
    ],
  },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
