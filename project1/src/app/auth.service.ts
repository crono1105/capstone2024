import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  public isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    // Verificar si hay un estado de inicio de sesión almacenado en el localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedIsLoggedIn === 'true';
  }

  async registrarUsuario(usuario: any): Promise<any> {
    const url = `${this.apiUrl}/registro`;

    try {
      const result = await this.http.post(url, usuario).toPromise();
      return result;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 200) {
        console.log('Usuario agregado con éxito');
        console.error('Error en la respuesta:', error);
        return null;
      } else {
        throw error;
      }
    }
  }

  async loginUsuario(credentials: any): Promise<any> {
    const url = `${this.apiUrl}/login`;

    try {
      const result = await this.http.post(url, credentials).toPromise();
   
      // Actualizar isLoggedIn solo después de un inicio de sesión exitoso
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      return result;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/home']);
  }
}
