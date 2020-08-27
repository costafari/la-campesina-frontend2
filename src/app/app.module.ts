import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { CdkScrollableModule } from "@angular/cdk/scrolling";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TableModule } from "primeng/table";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from "primeng/menu";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputMaskModule } from "primeng/inputmask";
import { CalendarModule } from "primeng/calendar";

import { LacampesinaService } from "./lacampesina.service";

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/list/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ProveedoresComponent } from './proveedores/list/proveedores/proveedores.component';
import { FormProveedorComponent } from './proveedores/form-proveedor/form-proveedor.component';
import { ListProductosComponent } from './productos/list-productos/list-productos.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { ListLotesComponent } from './lotes/list-lotes/list-lotes/list-lotes.component';
import { FormLotesComponent } from './lotes/form-lotes/form-lotes/form-lotes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FormComponent,
    MenuComponent,
    ProveedoresComponent,
    FormProveedorComponent,
    ListProductosComponent,
    FormProductosComponent,
    ListLotesComponent,
    FormLotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkScrollableModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PanelModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule
  ],
  providers: [LacampesinaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
