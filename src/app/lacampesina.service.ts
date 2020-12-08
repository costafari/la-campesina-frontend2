import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LacampesinaService {
  private laCampesinaEndpoint: string = 'http://localhost:8080/api/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private msgServ: MessageService,
    private confrmtServ: ConfirmationService
  ) {}

  getAllObjects(url: String): Observable<any[]> {
    return this.http.get<any[]>(this.laCampesinaEndpoint + url);
  }

  getObjectById(url: String, id: Number): Observable<any> {
    return this.http.get<any>(`${this.laCampesinaEndpoint + url}/${id}`);
  }

  createObject(url: String, obj: any): Observable<any> {
    return this.http.post<any>(this.laCampesinaEndpoint + url, obj, {
      headers: this.httpHeaders,
    });
  }

  updateObject(url: String, obj: any): Observable<any> {
    return this.http.put<any>(
      `${this.laCampesinaEndpoint + url}/${obj.id}`,
      obj,
      {
        headers: this.httpHeaders,
      }
    );
  }

  deleteObject(url: String, id: Number): Observable<any> {
    return this.http.delete<any>(`${this.laCampesinaEndpoint + url}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
