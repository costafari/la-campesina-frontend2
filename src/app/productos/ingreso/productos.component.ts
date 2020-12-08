import { Component, OnInit } from '@angular/core';
import { Productos } from '../productos';
import { LacampesinaService } from 'src/app/lacampesina.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listAllProductos: Productos[];

  producto: Productos;

  url: String = "productos";

  submitted: boolean;

  productoDialogo: boolean;

  productosSeleccionados: Productos[];

  constructor(private lacampesinaService: LacampesinaService, private msgServ: MessageService, private confrmtServ: ConfirmationService) { }

  ngOnInit(): void {
    this.showAllProductos();
  }

  showAllProductos(): void {
    this.lacampesinaService.getAllObjects(this.url).subscribe(
      Productos => this.listAllProductos = Productos
    )
  }

  editarProducto(producto: Productos) {
    this.producto = { ...producto };
    this.productoDialogo = true;
  }

  eliminarProductosSeleccionados() {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el(los) producto(s) seleccionado(s)? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllProductos = this.listAllProductos.filter(val => !this.productosSeleccionados.includes(val));
        this.productosSeleccionados.map(productoSeleccionado => this.lacampesinaService.deleteObject(this.url, productoSeleccionado.id).subscribe())
        this.productosSeleccionados = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto(s) Eliminado(s)', life: 3000 });
      }
    });
  }

  eliminarProducto(producto: Productos) {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el producto: ' + producto.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllProductos = this.listAllProductos.filter(val => val.id !== producto.id);
        this.lacampesinaService.deleteObject(this.url, producto.id).subscribe(Productos => this.showAllProductos())
        this.producto = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Eliminado', life: 3000 });
      }
    });
  }

  guardarModificarProducto() {
    this.submitted = true;
    if (this.producto.nombre.trim()) {
      // Si el id existe, procedemos a modificar
      if (this.producto.id) {
        this.listAllProductos[this.findIndexById(this.producto.id)] = this.producto;
        this.lacampesinaService.updateObject(this.url, this.producto).subscribe(productos => this.showAllProductos());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Actualizado', life: 3000 });
      }
      // Sino, es un producto nuevo y se procede a crearlo
      else {
        this.lacampesinaService.createObject(this.url, this.producto).subscribe(productos => this.showAllProductos());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Creado', life: 3000 });
      }

      this.listAllProductos = [...this.listAllProductos];
      this.productoDialogo = false;
      this.producto = new Productos;
    }
  }

  findIndexById(id: number): number {
    let index: Productos[];
    index = this.listAllProductos.filter(producto => producto.id == id);
    if (index.length)
      return index[0].id;
    else
      return -1;
  }

  abrirNuevo() {
    this.producto = new Productos();
    this.submitted = false;
    this.productoDialogo = true;
  }

  ocultarDialogo() {
    this.productoDialogo = false;
    this.submitted = false;
  }

}
