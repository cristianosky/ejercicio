import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './pages/form/form.component';
import { FormsComponent } from './pages/forms/forms.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { PasswordValidationDirective } from './validations/password-validation.directive';
import { EdadValidateDirective } from './validations/edad-validate.directive';
import { ConfirmarPassDirective } from './validations/confirmar-pass.directive';
import { DisableCopyPasteDirective } from './disable-copy-paste.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormsComponent,
    ActualizarComponent,
    PasswordValidationDirective,
    EdadValidateDirective,
    ConfirmarPassDirective,
    DisableCopyPasteDirective,
  ],
  entryComponents: [FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule  
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
