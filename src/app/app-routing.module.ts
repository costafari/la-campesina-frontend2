import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from "./clientes/list/clientes.component";
import { FormComponent } from "./clientes/form/form.component";
import { ProveedoresComponent } from './proveedores/list/proveedores/proveedores.component';
import { FormProveedorComponent } from './proveedores/form-proveedor/form-proveedor.component';
import { ListProductosComponent } from './productos/list-productos/list-productos.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { ListLotesComponent } from './lotes/list-lotes/list-lotes/list-lotes.component';
import { FormLotesComponent } from './lotes/form-lotes/form-lotes/form-lotes.component';

const routes: Routes = [
  {path: "", component: ClientesComponent},
  {path: "cliente-list", component: ClientesComponent},
  {path: "cliente-form", component: FormComponent},
  {path: "cliente-form/:id", component: FormComponent},
  {path: "proveedores-list", component: ProveedoresComponent},
  {path: "proveedores-form", component: FormProveedorComponent},
  {path: "proveedores-form/:id", component: FormProveedorComponent},
  {path: "productos-list", component: ListProductosComponent},
  {path: "productos-form", component: FormProductosComponent},
  {path: "productos-form/:id", component: FormProductosComponent},
  {path: "lotes-list", component: ListLotesComponent},
  {path: "lotes-form", component: FormLotesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
