/*
* Project Name: app-routing.module.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/
// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FaqComponent } from './faq/faq.component';
import { authGuard } from './shared/authguard.guard';
import { RegisterComponent } from './security/register/register.component';
import { SigninComponent } from './security/signin/signin.component';
import { LoginComponent } from './user/login/login.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home'
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'BCRS: Services'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'BCRS: About'
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'BCRS: Contact'
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'BCRS: Register'
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Signin',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'BCRS: Login',
      },
      {
        path: 'user-list', //title for task page
        component: UserListComponent,
        canActivate: [authGuard]
      }
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },

  // path to 404 page not found
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
