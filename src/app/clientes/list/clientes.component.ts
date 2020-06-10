import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente: Clientes = new Clientes()
  listAllClientes: Clientes[];

  constructor(private clienteService: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.showAllClientes();
  }

  showAllClientes(): void {
    this.clienteService.getAllClientes().subscribe(
      Clientes => this.listAllClientes = Clientes
    )
  }

  actualizarLinea(cliente: Clientes): void {
    this.clienteService.updateCliente(cliente).subscribe()
  }

  eliminarLinea(id: Number): void {
    this.clienteService.deleteCliente(id).subscribe(
      Clientes => this.showAllClientes()
    );
  }

}
