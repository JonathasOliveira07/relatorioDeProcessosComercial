import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../cadastro/cadastro';

interface AuthResponse {
  access_token: string;
}

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly usersApi = 'http://localhost:3000/users';
  private readonly authApi = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* =========================
     LOGIN
     ========================= */

  login(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.authApi}/auth/login`,
      { email, senha },
      { observe: 'response' }
    ).pipe(
      tap(response => {
        const token = response.body?.access_token;
        if (token) {
          this.salvarToken(token);
        }
      })
    );
  }

  logout(): void {
    this.excluirToken();
  }

  isAuthenticated(): boolean {
    return !!this.retornarToken();
  }

  /* =========================
     TOKEN
     ========================= */

  private salvarToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private excluirToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  retornarToken(): string {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  }

  /* =========================
     CADASTRO
     ========================= */

  cadastrar(user: User): Observable<User> {
    return this.obterMaiorId().pipe(
      switchMap(maiorId => {
        user.id = maiorId + 1;
        return this.http.post<User>(this.usersApi, user);
      })
    );
  }

  private obterMaiorId(): Observable<number> {
    return this.http.get<User[]>(this.usersApi).pipe(
      map(users => {
        if (!users.length) return 0;
        return Math.max(...users.map(u => u.id ?? 0));
      })
    );
  }

  buscarPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/${id}`);
  }
}
