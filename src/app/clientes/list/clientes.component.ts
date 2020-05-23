import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listAllClientes: Clientes[];

  constructor(private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.getAllClientes().subscribe(
      Clientes => this.listAllClientes = Clientes
    )
  }

}
