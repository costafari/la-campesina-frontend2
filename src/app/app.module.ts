// Imports Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { CdkScrollableModule } from "@angular/cdk/scrolling";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Modulos Prime
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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputNumberModule } from "primeng/inputnumber";

// Servicios Prime
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

// Servicios La Campesina
import { LacampesinaService } from "./lacampesina.service";

// Modulos La Campesina
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/ingreso/clientes.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ProveedoresComponent } from './proveedores/ingreso/proveedores.component';
import { ProductosComponent } from './productos/ingreso/productos.component';
import { LotesComponent } from './lotes/ingreso/lotes.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    MenuComponent,
    ProveedoresComponent,
    ProductosComponent,
    LotesComponent,
    HomeComponent,
    NotFoundComponent
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
    CalendarModule,
    ToastModule,
    ToolbarModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule
  ],
  providers: [LacampesinaService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
