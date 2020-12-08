import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { LacampesinaService } from 'src/app/lacampesina.service';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente: Clientes;

  listAllClientes: Clientes[];

  url: String = "clientes";

  submitted: boolean;

  clienteDialogo: boolean;

  clientesSeleccionados: Clientes[];

  constructor(private lacampesinaService: LacampesinaService, private msgServ: MessageService, private confrmtServ: ConfirmationService) { }

  ngOnInit(): void {
    this.showAllClientes();
  }

  showAllClientes(): void {
    this.lacampesinaService.getAllObjects(this.url).subscribe(Clientes => this.listAllClientes = Clientes)
  }

  editarCliente(cliente: Clientes) {
    this.cliente = { ...cliente };
    this.clienteDialogo = true;
  }

  eliminarClientesSeleccionados() {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el(los) cliente(s) seleccionado(s)? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllClientes = this.listAllClientes.filter(val => !this.clientesSeleccionados.includes(val));
        this.clientesSeleccionados.map(clienteSeleccionado => this.lacampesinaService.deleteObject(this.url, clienteSeleccionado.id).subscribe())
        this.clientesSeleccionados = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Cliente(s) Eliminado(s)', life: 3000 });
      }
    });
  }

  eliminarCliente(cliente: Clientes) {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el cliente: ' + cliente.nombres + ' ' + cliente.apellidos + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllClientes = this.listAllClientes.filter(val => val.id !== cliente.id);
        this.lacampesinaService.deleteObject(this.url, cliente.id).subscribe(Clientes => this.showAllClientes())
        this.cliente = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Cliente Eliminado', life: 3000 });
      }
    });
  }

  guardarModificarCliente() {
    this.submitted = true;
    if (this.cliente.nombres.trim()) {
      // Si el id existe, procedemos a modificar
      if (this.cliente.id) {
        this.listAllClientes[this.findIndexById(this.cliente.id)] = this.cliente;
        this.lacampesinaService.updateObject(this.url, this.cliente).subscribe(Clientes => this.showAllClientes());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Cliente Actualizado', life: 3000 });
      }
      // Sino, es un cliente nuevo y se procede a crearlo
      else {
        this.lacampesinaService.createObject(this.url, this.cliente).subscribe(Clientes => this.showAllClientes());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Cliente Creado', life: 3000 });
      }

      this.listAllClientes = [...this.listAllClientes];
      this.clienteDialogo = false;
      this.cliente = new Clientes;
    }
  }

  findIndexById(id: number): number {
    let index: Clientes[];
    index = this.listAllClientes.filter(cliente => cliente.id == id);
    if (index.length)
      return index[0].id;
    else
      return -1;
  }

  abrirNuevo() {
    this.cliente = new Clientes();
    this.submitted = false;
    this.clienteDialogo = true;
  }

  ocultarDialogo() {
    this.clienteDialogo = false;
    this.submitted = false;
  }

}
