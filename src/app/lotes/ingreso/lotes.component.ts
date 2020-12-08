import { Component, OnInit } from '@angular/core';
import { Lotes } from '../lotes';
import { LacampesinaService } from 'src/app/lacampesina.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Proveedores } from 'src/app/proveedores/proveedores';
import { Productos } from 'src/app/productos/productos';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css'],
})
export class LotesComponent implements OnInit {
  lote: Lotes;

  listAllLotes: Lotes[];

  url: String = 'lotes';

  submitted: boolean;

  loteDialogo: boolean;

  lotesSeleccionados: Lotes[];

  // Proveedores
  arrayProveedores: SelectItem[];

  listProveedores: Proveedores[];

  proveedorSeleccionado: Proveedores;
  // fin Proveedores

  // Productos
  listProductos: Productos[];
  arrayProductos: SelectItem[];
  productoSeleccionado: Productos;
  // fin Productos

  defaultDate: Date = new Date();

  constructor(
    private lacampesinaService: LacampesinaService,
    private msgServ: MessageService,
    private confrmtServ: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.showAllLotes();
  }

  showAllLotes(): void {
    this.lacampesinaService.getAllObjects(this.url).subscribe({
      next: (lotes) => (this.listAllLotes = lotes),
      error: catchError((e) => {
        // if (e.status == 400) {
        //   return throwError(e);
        // }
        this.msgServ.add({
          severity: 'error',
          summary: e.error.mensaje,
          detail: e.error.error,
          life: 3000,
        });
        return throwError(e);
      }),
      complete: function () {},
    });
  }

  showAllProveedores(l: Lotes): void {
    this.lacampesinaService.getAllObjects('proveedores').subscribe((data) => {
      this.listProveedores = data;
      this.arrayProveedores = [];

      //   forzosamente, extraemos un array de proveedores (nombre y id) para luego poder mostrarlo en el form
      if (l.id != null) {
        // si no es null es edicion, en caso contrario en creacion
        this.arrayProveedores.push({
          label: this.listProveedores.find(
            (elemento) => elemento.id === l.proveedor.id
          ).nombreEmpresa,
          value: this.listProveedores.find(
            (elemento) => elemento.id === l.proveedor.id
          ).id,
        });
      }

      for (let i = 0; i < this.listProveedores.length; i++) {
        this.arrayProveedores.push({
          label: this.listProveedores[i].nombreEmpresa,
          value: this.listProveedores[i].id,
        });
      }
    });
  }

  showAllProductos(l: Lotes): void {
    this.lacampesinaService.getAllObjects('productos').subscribe({
      next: (data) => {
        this.arrayProductos = [];
        if (l.id != null) {
          this.arrayProductos.push({
            label: data.find((elemento) => elemento.id === l.producto.id)
              .nombre,
            value: data.find((elemento) => elemento.id === l.producto.id).id,
          });
        }
        data.forEach((elemento) =>
          this.arrayProductos.push({
            label: elemento.nombre,
            value: elemento.id,
          })
        );
        return this.listProductos;
      },
      error: catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        this.msgServ.add({
          severity: 'error',
          summary: e.error.mensaje,
          detail: e.error.error,
          life: 3000,
        });
        return throwError(e);
      }),
      complete: function () {},
    });
  }

  editarLote(lote: Lotes) {
    this.showAllProveedores(lote);
    this.showAllProductos(lote);
    lote.fechaEntrada = new Date(lote.fechaEntrada);
    console.log("MOSTRAR VALOR DE PRODUCTO: " + this.productoSeleccionado); 
    // Sintaxis Spread (ES2018+) extendido para objetos literales y ya no solo para arrays
    this.lote = { ...lote };
    this.loteDialogo = true;
  }

  eliminarLotesSeleccionados() {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el(los) lote(s) seleccionado(s)? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllLotes = this.listAllLotes.filter(
          (val) => !this.lotesSeleccionados.includes(val)
        );
        this.lotesSeleccionados.map((loteseleccionado) =>
          this.lacampesinaService
            .deleteObject(this.url, loteseleccionado.id)
            .subscribe({
              next: () =>
                this.msgServ.add({
                  severity: 'success',
                  summary: 'Exitoso',
                  detail: 'Lote(s) Eliminado(s)',
                  life: 3000,
                }),
              error: catchError((e) => {
                if (e.status == 400) {
                  return throwError(e);
                }
                this.msgServ.add({
                  severity: 'error',
                  summary: e.error.mensaje,
                  detail: e.error.error,
                  life: 3000,
                });
                return throwError(e);
              }),
              complete: function () {},
            })
        );
        this.lotesSeleccionados = null;
      },
    });
  }

  eliminarLote(lote: Lotes) {
    this.confrmtServ.confirm({
      message: '¿Seguro que desea eliminar el lote: ' + lote.lote + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listAllLotes = this.listAllLotes.filter(
          (val) => val.id !== lote.id
        );
        this.lacampesinaService
          .deleteObject(this.url, lote.id)
          .subscribe((lotes) => this.showAllLotes());
        this.lote = null;
        this.msgServ.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Lote Eliminado',
          life: 3000,
        });
      },
    });
  }

  guardarModificarLote() {
    this.submitted = true;
    // Pequena validacion. Se limpia de impurezas
    if (this.lote.lote.trim()) {
      // Si el id existe, procedemos a modificar
      if (this.lote.id) {
        console.log("this.lote.producto => " + this.lote.producto);
        console.log("this.lote.proveedor => " + this.lote.proveedor);
        this.lacampesinaService.updateObject(this.url, this.lote).subscribe({
          next: (response) => {
            this.msgServ.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: response.mensaje,
              life: 3000,
            });
            (lotes) => this.showAllLotes();
          },
          error: catchError((e) => {
            if (e.status == 400) {
              return throwError(e);
            }
            this.msgServ.add({
              severity: 'error',
              summary: e.error.mensaje,
              detail: e.error.error,
              life: 3000,
            });
            return throwError(e);
          }),
          complete: function () {},
        });
      }
      // Sino, es un lote nuevo y se procede a crearlo
      else {
        console.log("this.lote.producto => " + this.lote.producto);
        console.log("this.lote.proveedor => " + this.lote.proveedor);
        this.lacampesinaService.createObject(this.url, this.lote).subscribe({
          next: (response) =>
            this.msgServ.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: response.mensaje,
              life: 3000,
            }),
          error: catchError((e) => {
            if (e.status == 400) {
              return throwError(e);
            }
            this.msgServ.add({
              severity: 'error',
              summary: e.error.mensaje,
              detail: e.error.error,
              life: 3000,
            });
            return throwError(e);
          }),
          complete: function () {},
        });
        (lotes) => this.showAllLotes();
      }
      this.listAllLotes = [...this.listAllLotes];
      this.loteDialogo = false;
      this.lote = new Lotes();
    }
  }

  findIndexById(id: number): number {
    let index: Lotes[];
    index = this.listAllLotes.filter((lote) => lote.id == id);
    if (index.length) return index[0].id;
    else return -1;
  }

  abrirNuevo() {
    this.lote = new Lotes();
    this.showAllProveedores(this.lote);
    this.showAllProductos(this.lote);
    this.submitted = false;
    this.loteDialogo = true;
  }

  ocultarDialogo() {
    this.loteDialogo = false;
    this.submitted = false;
  }

  onChangeProveedor(event) {
    this.lote.proveedor = this.proveedorSeleccionado;
  }

  // onChangeProducto(event) {
  //   this.lote.producto = this.productoSeleccionado;
  // }
}
