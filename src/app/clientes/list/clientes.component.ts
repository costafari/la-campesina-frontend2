import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { Router } from '@angular/router';
import { LacampesinaService } from 'src/app/lacampesina.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente: Clientes = new Clientes()
  listAllClientes: Clientes[];
  url: String = "clientes";

  constructor(private router: Router, private lacampesinaService: LacampesinaService) { }

  ngOnInit(): void {
    this.showAllClientes();
  }

  showAllClientes(): void {
    this.lacampesinaService.getAllObjects(this.url).subscribe(
      Clientes => this.listAllClientes = Clientes
    )
  }

  deleteCliente(id: Number): void {
    this.lacampesinaService.deleteObject(this.url, id).subscribe(
      Clientes => this.showAllClientes()
    )
  }

}
