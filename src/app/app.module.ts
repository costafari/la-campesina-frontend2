import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { CdkScrollableModule } from "@angular/cdk/scrolling";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TableModule } from "primeng/components/table/table";
import { PanelModule } from "primeng/components/panel/panel";
import { ButtonModule } from "primeng/components/button/button";
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { MenuModule } from "primeng/menu";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { InputTextareaModule } from "primeng/components/inputtextarea/inputtextarea";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";
import { MenuItem } from 'primeng/api';

import { ClientesService } from "./clientes/clientes.service";

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/list/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { MenuComponent } from './menu/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FormComponent,
    MenuComponent
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
    InputMaskModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
