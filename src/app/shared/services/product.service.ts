import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_GLOBAL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${URL_GLOBAL}/products`);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${URL_GLOBAL}/products`, data);
  }

  find(param: any, id: any): Observable<any> {
    return this.http.get(`${`${URL_GLOBAL}/products`}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${`${URL_GLOBAL}/products`}/${id}`,
      data
    );
  }

  destroy(id: any): Observable<any> {
    return this.http.delete<any>(
      `${`${URL_GLOBAL}/products`}/${id}`
    );
  }
}
