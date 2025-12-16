import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API)
  }

  obterMaiorId(): Observable<number> {
    return this.http.get<Pensamento[]>(this.API).pipe(
      map(pensamentos => {
        if (pensamentos.length === 0) return 0;
        const ids = pensamentos.map(p => p.id || 0);
        return Math.max(...ids);
      })
    );
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.obterMaiorId().pipe(
      switchMap(maiorId => {
        pensamento.id = maiorId + 1;
        return this.http.post<Pensamento>(this.API, pensamento);
      })
    );
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento )

  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

  enviarEmail(pensamento: Pensamento) {
    return this.http.post('/api/enviar-email', pensamento);
  }

}
