import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LacampesinaService } from 'src/app/lacampesina.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {

  public form: FormGroup;
  public esModificar: boolean;
  private idForm: number;
  url: String = "proveedores";

  constructor(private lacampesinaService: LacampesinaService, private fb: FormBuilder, private ar: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'nombreEmpresa': new FormControl('', Validators.required),
      'nombreContacto': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'telefonoFijo': new FormControl('', Validators.required),
      'telefonoFijo2': new FormControl('', Validators.required),
      'telefonoMovil': new FormControl('', Validators.required),
      'telefonoMovil2': new FormControl('', Validators.required),
      'notas': new FormControl('', Validators.required),
      'activo': new FormControl('True', Validators.required)
    });

    this.esModificar = false;
    this.cargarProveedor();
  }

  public cargarProveedor(): void {
    this.ar.params.subscribe(
      params => {
        this.idForm = params['id']
        if (this.idForm) {
          this.lacampesinaService.getObjectById(this.url, this.idForm).subscribe(values => {
            this.form.patchValue(values);
            this.esModificar = true;
          })
        }
      }
    )
  }

  public onSubmit(formulario): void {
    if (this.esModificar){
      formulario.id = this.idForm;
      this.lacampesinaService.updateObject(this.url, formulario).subscribe();
    }
    else
      this.lacampesinaService.createObject(this.url, formulario).subscribe()
  }

}
