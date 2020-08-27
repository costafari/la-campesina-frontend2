import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LacampesinaService } from 'src/app/lacampesina.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedores } from 'src/app/proveedores/proveedores';
import { Productos } from 'src/app/productos/productos';

@Component({
  selector: 'app-form-lotes',
  templateUrl: './form-lotes.component.html',
  styleUrls: ['./form-lotes.component.css']
})

export class FormLotesComponent implements OnInit {

  public form: FormGroup;
  public esModificar: boolean;
  private idForm: number;
  url: String = "lotes";
  listAllProveedores: Proveedores[];
  listAllProductos: Productos[];
  fechaEntrada: Date = new Date();

  constructor(private lacampesinaService: LacampesinaService, private router: Router, private fb: FormBuilder, private ar: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      'lote': new FormControl('', Validators.required),
      'fechaEntrada': new FormControl('', Validators.required),
      'cantidad': new FormControl('', Validators.required),
      'proveedor' : new FormControl('', Validators.required),
      'producto': new FormControl('', Validators.required),
      'activo': new FormControl('True', Validators.required)
    })
    
    this.cargarLote();
    this.esModificar = false;
  }

  public cargarLote(): void {
    this.ar.params.subscribe(
      params => {
        this.idForm = params['id']
        if (this.idForm) {
          this.lacampesinaService.getObjectById(this.url, this.idForm).subscribe(values => {
            this.form.patchValue(values);
            this.esModificar = true;;
          })
        }
      }
    )
    // para mejorar esta consulta, se podria hacer otro servicio que solo traiga id con nombres... ademas poner indices a las tablas
    this.lacampesinaService.getAllObjects("proveedores").subscribe(
      Proveedor => this.listAllProveedores = Proveedor
    )
    this.lacampesinaService.getAllObjects("productos").subscribe(
      Productos => this.listAllProductos = Productos
    )
  }

  public onSubmit(formulario): void {
    if (this.esModificar) {
      formulario.id = this.idForm;
      this.lacampesinaService.updateObject(this.url, formulario).subscribe();
    }
    else {
      this.lacampesinaService.createObject(this.url, formulario).subscribe();
    }
  }

}
