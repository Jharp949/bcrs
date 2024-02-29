/*
* Project Name: app.module.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FaqComponent } from './faq/faq.component';
import { ServiceGraphComponent } from './services/service-graph/service-graph.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserNewComponent } from './admin/users/user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RegisterComponent } from './users/register/register.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './users/verify-security-questions/verify-security-questions.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ChartModule } from 'primeng/chart';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';

//Material design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    FaqComponent,
    ServiceGraphComponent,
    AdminComponent,
    UsersComponent,
    UserListComponent,
    UserNewComponent,
    UserEditComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    VerifySecurityQuestionsComponent,
    ServiceRepairComponent,
    UserProfileComponent,
    InvoiceSummaryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
