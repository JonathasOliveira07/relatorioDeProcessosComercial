import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './cadastro';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly API = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  obterMaiorId(): Observable<number> {
    return this.http.get<User[]>(this.API).pipe(
      map(users => {
        if (users.length === 0) return 0;
        const ids = users.map(p => p.id || 0);
        return Math.max(...ids);
      })
    );
  }

  buscarPorId(id: number): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }

  cadastrarUser(user: User): Observable<User> {
      return this.obterMaiorId().pipe(
        switchMap(maiorId => {
          user.id = maiorId + 1;
          return this.http.post<User>(this.API, user);
        })
        // this.http.post<User>(this.API, user)
      );
    }
  }


