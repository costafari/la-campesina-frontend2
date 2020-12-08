import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from "./clientes/ingreso/clientes.component";
import { ProveedoresComponent } from './proveedores/ingreso/proveedores.component';
import { ProductosComponent } from './productos/ingreso/productos.component';
import { LotesComponent } from './lotes/ingreso/lotes.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "cliente", component: ClientesComponent},
  // {path: "cliente/:id", component: FormComponent},
  {path: "proveedores", component: ProveedoresComponent},
  // {path: "proveedores/:id", component: FormProveedorComponent},
  {path: "productos", component: ProductosComponent},
  // {path: "productos/:id", component: FormProductosComponent},
  {path: "lotes", component: LotesComponent},
  // {path: "lotes/:id", component: FormLotesComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
