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

  constructor(private clienteService: ClientesService, private router: Router, private fb: FormBuilder, private ar: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'nombres': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'nombreEmpresa': new FormControl('', Validators.required),
      'nombreContacto': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'telefonoFijo1': new FormControl('', Validators.required),
      'telefonoFijo2': new FormControl('', Validators.required),
      'movil1': new FormControl('', Validators.required),
      'movil2': new FormControl('', Validators.required),
      'web': new FormControl('', Validators.required),
      'notas': new FormControl('', Validators.required)
    })

    this.cargarCliente();

  }

  public cargarCliente(): void {
    this.ar.params.subscribe(
      params => {
        let id = params['id']
        console.log(id)
        if (id) {
          this.clienteService.getClienteById(id).subscribe((cliente) => this.cliente = cliente)
          this.form.setValue({id: id, nombres: this.cliente.nombres})
        }
      }
    )
  }

  public onSubmit(formulario): void {
    this.clienteService.createCliente(formulario).subscribe();
  }

  public update(formulario): void {
    this.clienteService.updateCliente(formulario).subscribe();
  }



}
