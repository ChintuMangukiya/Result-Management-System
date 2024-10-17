import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { LoadingSpinnerComponent } from 'src/shared/Loading-Spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    HomeComponent,
    AddEditComponent,
    HeaderComponent,
    ContactComponent,
    LoadingSpinnerComponent
    // other components
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    BrowserAnimationsModule, // AgGridModule imported here
    MaterialModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
