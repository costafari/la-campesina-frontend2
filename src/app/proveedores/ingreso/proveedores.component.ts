import { Component, OnInit } from '@angular/core';
import { Proveedores } from 'src/app/proveedores/proveedores';
import { LacampesinaService } from 'src/app/lacampesina.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedor: Proveedores;

  listAllProveedores: Proveedores[];

  url: String = "proveedores";

  submitted: boolean;

  proveedorDialogo: boolean;

  proveedoresSeleccionados: Proveedores[];

  constructor(private lacampesinaService: LacampesinaService, private msgServ: MessageService, private confrmtServ: ConfirmationService) { }

  ngOnInit(): void {
    this.showAllProveedores();
  }

  showAllProveedores(): void {
    this.lacampesinaService.getAllObjects(this.url).subscribe(Proveedor => this.listAllProveedores = Proveedor)
  }

  editarProveedor(proveedor: Proveedores) {
    this.proveedor = { ...proveedor };
    this.proveedorDialogo = true;
  }

  eliminarProveedoresSeleccionados() {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el(los) proveedor(es) seleccionado(s)? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllProveedores = this.listAllProveedores.filter(val => !this.proveedoresSeleccionados.includes(val));
        this.proveedoresSeleccionados.map(proveedorSeleccionado => this.lacampesinaService.deleteObject(this.url, proveedorSeleccionado.id).subscribe())
        this.proveedoresSeleccionados = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Proveedor(es) Eliminado(s)', life: 3000 });
      }
    });
  }

  eliminarProveedor(proveedor: Proveedores) {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el proveedor: ' + proveedor.nombreEmpresa + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllProveedores = this.listAllProveedores.filter(val => val.id !== proveedor.id);
        this.lacampesinaService.deleteObject(this.url, proveedor.id).subscribe(Proveedores => this.showAllProveedores())
        this.proveedor = null;
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Proveedor Eliminado', life: 3000 });
      }
    });
  }

  guardarModificarProveedor() {
    this.submitted = true;
    if (this.proveedor.nombreEmpresa.trim()) {
      // Si el id existe, procedemos a modificar
      if (this.proveedor.id) {
        this.listAllProveedores[this.findIndexById(this.proveedor.id)] = this.proveedor;
        this.lacampesinaService.updateObject(this.url, this.proveedor).subscribe(Proveedor => this.showAllProveedores());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Proveedor Actualizado', life: 3000 });
      }
      // Sino, es un cliente nuevo y se procede a crearlo
      else {
        this.lacampesinaService.createObject(this.url, this.proveedor).subscribe(Proveedor => this.showAllProveedores());
        this.msgServ.add({ severity: 'success', summary: 'Exitoso', detail: 'Proveedor Creado', life: 3000 });
      }

      this.listAllProveedores = [...this.listAllProveedores];
      this.proveedorDialogo = false;
      this.proveedor = new Proveedores;
    }
  }

  findIndexById(id: number): number {
    let index: Proveedores[];
    index = this.listAllProveedores.filter(proveedor => proveedor.id == id);
    if (index.length)
      return index[0].id;
    else
      return -1;
  }

  abrirNuevo() {
    this.proveedor = new Proveedores();
    this.submitted = false;
    this.proveedorDialogo = true;
  }

  ocultarDialogo() {
    this.proveedorDialogo = false;
    this.submitted = false;
  }

}
