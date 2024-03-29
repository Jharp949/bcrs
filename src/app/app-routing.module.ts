/*
* Project Name: app-routing.module.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authguard.guard';
import { RoleGuard } from './shared/role.guard';

// Components for the app
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterComponent } from './users/register/register.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { ServiceGraphComponent } from './services/service-graph/service-graph.component';
import { SigninComponent } from './security/signin/signin.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component'; 
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { VerifySecurityQuestionsComponent } from './users/verify-security-questions/verify-security-questions.component';
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home'
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
        path: 'register',
        component: RegisterComponent,
        title: 'BCRS: Register'
      },
      {
        path:'verify-email',
        component: VerifyEmailComponent,
        title: 'BCRS: Forgot Password',
      },
      {
        path:'verify-security-questions',
        component: VerifySecurityQuestionsComponent,
        title: 'BCRS: Forgot Password',
      },
      {
        path:'reset-password',
        component: ResetPasswordComponent,
        title: 'BCRS: Forgot Password',
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ'
      },
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Signin',
      },
      {
        path: 'user-list', //title for task page
        component: UserListComponent,
        canActivate: [AuthGuard, RoleGuard], // Add the RoleGuard to the canActivate array
        data: { expectedRole: 'admin'}
       },
       {
        path: 'user-edit/:empId',
        component: UserEditComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'admin' } // Specify the expected role for admin access
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'standard' }
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRoles: ['admin', 'standard'] }
      },
      {
        path: 'service-graph',
        component: ServiceGraphComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'admin' }
      },

      {
        path: 'invoice-summary',
        component: InvoiceSummaryComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRoles: ['admin', 'standard'] }
      },
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
