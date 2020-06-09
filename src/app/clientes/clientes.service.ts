import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Clientes } from "./clientes";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientesEndpoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.clientesEndpoint);
  }

  getClienteById(id: Number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.clientesEndpoint}/${id}`);
  }

  createCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.clientesEndpoint, cliente, {headers: this.httpHeaders});
  }

  updateCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.clientesEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  deleteCliente(id: Number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.clientesEndpoint}/${id}`, {headers: this.httpHeaders});
  }

}
