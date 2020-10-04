import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './pages/form/form.component';
import { FormsComponent } from './pages/forms/forms.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';

const routes: Routes = [
    {
      path: 'form/:id', component: ActualizarComponent      
    },

    {
      path: 'forms', component: FormsComponent
    },

    {
      path: '**', pathMatch: 'full', redirectTo: 'forms'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
