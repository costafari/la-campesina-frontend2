import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../proveedores';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LacampesinaService } from 'src/app/lacampesina.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  listAllProveedores: Proveedores[];
  url: String = "proveedores";

  constructor(private lacampesinaService: LacampesinaService, private router: Router) { }

  ngOnInit(): void {
    this.showAllProveedores();
  }

  showAllProveedores(): void{
    this.lacampesinaService.getAllObjects(this.url).subscribe(
      Proveedor => this.listAllProveedores = Proveedor
    )
  }

  deleteProveedor(id: Number): void{
    this.lacampesinaService.deleteObject(this.url, id).subscribe(
      Proveedores => this.showAllProveedores()
    )
  }

}
