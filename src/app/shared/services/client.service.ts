import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_GLOBAL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_GLOBAL}/clients`);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${URL_GLOBAL}/clients`, data);
  }

  find(param: any, id: any): Observable<any> {
    return this.http.get(`${`${URL_GLOBAL}/clients`}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${`${URL_GLOBAL}/clients`}/${id}`,
      data
    );
  }

  destroy(id: any): Observable<any> {
    return this.http.delete<any>(
      `${`${URL_GLOBAL}/clients`}/${id}`
    );
  }
  buscaClientePorCPF(cpf): Observable<any> {
    return this.http.get(`${`${URL_GLOBAL}/clients`}/buscaClientePorCPF?cpf=${cpf}`);
  }
}
