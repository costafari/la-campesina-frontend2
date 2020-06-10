import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Clientes } from '../clientes';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente: Clientes = new Clientes();
  public form: FormGroup;
  public esModificar: boolean;
  private idForm: number;

  constructor(private clienteService: ClientesService, private router: Router, private fb: FormBuilder, private ar: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'nombres': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'nombreEmpresa': new FormControl('', Validators.required),
      'nombreContacto': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'telefonoFijo': new FormControl('', Validators.required),
      'telefonoFijo2': new FormControl('', Validators.required),
      'telefonoMovil': new FormControl('', Validators.required),
      'telefonoMovil2': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'sitioWeb': new FormControl('', Validators.required),
      'notas': new FormControl('', Validators.required),
      'activo': new FormControl('True', Validators.required)
    })

    this.esModificar = false;
    this.cargarCliente();

  }

  // Metodo para solicitar el control de los elementos de Form en la vista
  // get f() {
  //   return this.form.controls;
  // }

  public cargarCliente(): void {
    this.ar.params.subscribe(
      params => {
        this.idForm = params['id']
        if (this.idForm) {
          this.clienteService.getClienteById(this.idForm).subscribe(values => {
            this.esModificar = true;
            this.form.patchValue(values)
          })
        }
      }
    )
  }

  public onSubmit(formulario): void {
    if (this.esModificar){
      formulario.id = this.idForm;
      this.clienteService.updateCliente(formulario).subscribe();
    }
    else
      this.clienteService.createCliente(formulario).subscribe()
  }

}
