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
import { ServicesComponent } from './services/services.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SecurityQuestionsComponent } from './security-questions/security-questions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './security/register/register.component';
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
import { SecurityQuestionListComponent } from './security-question-list/security-question-list.component';

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
    ServicesComponent,
    RegisterComponent, // Add the RegisterComponent here
    ServiceGraphComponent,
    UserListComponent,
    UserDetailsComponent,
    SecurityQuestionsComponent,
    SecurityQuestionListComponent,
    LoginComponent
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
