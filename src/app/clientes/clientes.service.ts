import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Clientes } from "./clientes";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientesEndpoint: string = "http://localhost:8080/api/clientes";

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.clientesEndpoint);
  }

}
