import { Component, OnInit } from '@angular/core';
import { Productos } from '../productos';
import { Router } from '@angular/router';
import { LacampesinaService } from 'src/app/lacampesina.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  listAllProductos: Productos[];
  url: String = "productos";

  constructor(private lacampesinaService: LacampesinaService, private router: Router) { }

  ngOnInit(): void {
    this.showAllProductos();
  }

  showAllProductos(): void{
    this.lacampesinaService.getAllObjects(this.url).subscribe(
      Productos => this.listAllProductos = Productos
    )
  }

  deleteProducto(id: Number): void{
    this.lacampesinaService.deleteObject(this.url, id).subscribe(
      Productos => this.showAllProductos()
    )
  }

}
