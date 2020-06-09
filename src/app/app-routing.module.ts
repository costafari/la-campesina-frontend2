import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from "./clientes/list/clientes.component";
import { FormComponent } from "./clientes/form/form.component";

const routes: Routes = [
  {path: "", component: ClientesComponent},
  {path: "cliente-form", component: FormComponent},
  {path: "cliente-list", component: ClientesComponent},
  {path: "cliente-form/:id", component: FormComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
