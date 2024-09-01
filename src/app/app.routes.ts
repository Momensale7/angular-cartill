
import { Routes } from '@angular/router';
import { authGuard } from '../../auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ShipingAddressComponent } from './pages/shiping-address/shiping-address.component';
// import {ProductsComponent} from "./pages/products/products.component"

export const routes: Routes = [
    // home route
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "allorders", redirectTo: "home", pathMatch: "full" },
    {
        path: "home",
        loadComponent: () => import("./pages/home/home.component").then(m => m.HomeComponent)
    },

    {
        path: "product-details/:id",
        loadComponent: () => import("./pages/product-details/product-details.component").then(m => m.ProductDetailsComponent)
    },
    {
        path: "login",
        loadComponent: () => import("./pages/login/login.component").then(m => m.LoginComponent)
    },
    {
        path: "register",
        loadComponent: () => import("./pages/register/register.component").then(m => m.RegisterComponent)
    },

    // other routes

    {path:"cart",canActivate:[authGuard],component:CartComponent},
    {path:"changePass",canActivate:[authGuard],component:ChangePassComponent},
    {path:"shipping/:id",canActivate:[authGuard],component:ShipingAddressComponent}
    // {path:"login",canActivate:[authGuard],component:LoginComponent},
    // {path:"register",canActivate:[authGuard],component:RegisterComponent}


];
