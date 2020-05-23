import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { CdkScrollableModule } from "@angular/cdk/scrolling";

import { TableModule } from "primeng/components/table/table";
import { PanelModule } from "primeng/components/panel/panel";
import { ButtonModule } from "primeng/components/button/button";

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/list/clientes.component';

import { ClientesService } from "./clientes/clientes.service";
import { FormComponent } from './clientes/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkScrollableModule,
    TableModule,
    PanelModule,
    ButtonModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
