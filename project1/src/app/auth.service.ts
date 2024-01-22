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
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      const usuarioCorreo = localStorage.getItem('usuarioCorreo');
      if (!usuarioCorreo) {
        this.logout();
      }
    }
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

      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('usuarioCorreo', credentials.correo_electronico); // Almacenar el correo electrónico del usuario
      console.log(localStorage.getItem('usuarioCorreo'));
      return result;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuarioCorreo'); // Limpiar el correo electrónico del usuario
    this.router.navigate(['/home']);
  }

  async registrarEmpresa(empresa: any): Promise<any> {
    const url = `${this.apiUrl}/empresa`;
    const usuarioCorreo = localStorage.getItem('usuarioCorreo');
    if (!usuarioCorreo) {
      throw new Error('No hay un usuario logueado.');
    }

    const empresaConUsuario = { ...empresa, usuario_correo: usuarioCorreo };

    try {
      const result = await this.http.post(url, empresaConUsuario).toPromise();
      console.log('Empresa registrada con éxito');
      return result;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Error al registrar la empresa:', error.message);
        throw error;
      }
    }
  }

  async obtenerComunas(): Promise<any[]> {
    const url = `${this.apiUrl}/comunas`;
    try {
      const comunas = await this.http.get<any[]>(url).toPromise();
      return comunas || [];
    } catch (error) {
      console.error('Error al obtener comunas:', error);
      return [];
    }
  }
  async agregarProducto(producto: any): Promise<any> {
    const url = `${this.apiUrl}/producto`;
    try {
      const resultado = await this.http.post(url, producto).toPromise();
      return resultado;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  }

  async obtenerCategoria(): Promise<any[]> {
    const url = `${this.apiUrl}/categoria_producto`;
    try {
      const categoria = await this.http.get<any[]>(url).toPromise();
      return categoria || [];
      console.log(categoria);
    } catch (error) {
      console.error('Error al obtener comunas:', error);
      return [];
    }
  }

  async obtenerEmpresasPorUsuario(usuarioCorreo: string): Promise<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/empresas/${localStorage.getItem('usuarioCorreo')}`).toPromise()
      .then(empresas => empresas || [])
  }

  async obtenerEmpresasPorUsuarioLogiado(usuarioCorreo: string): Promise<any[]> {
    const response = await this.http.get<any[]>(`${this.apiUrl}/empresas/${localStorage.getItem('usuarioCorreo')}`).toPromise();

    return response || [];
  }

  async obtenerProductosPorEmpresa(rutEmpresa: string): Promise<any[]> {
    const url = `${this.apiUrl}/productos/${rutEmpresa}`;
    try {
      const productos = await this.http.get<any[]>(url).toPromise();
      return productos || [];
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }



  async obtenerTodosLosProductos(): Promise<any[]> {
    const url = `${this.apiUrl}/productos`; // Ruta definida en tu servidor para obtener todos los productos
    try {
      const productos = await this.http.get<any[]>(url).toPromise();
      return productos || [];
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      return [];
    }
  }

  // Función para obtener un usuario por correo electrónico
  async getUsuarioPorCorreo(correoElectronico: string): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/usuario/${correoElectronico}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener usuario por correo electrónico:', error);
      throw error;
    }
  }

  async obtenerDetalleProducto(idProducto: number): Promise<any> {
    try {
      // Realiza una solicitud GET para obtener el detalle del producto por su ID
      const response = await this.http.get(`${this.apiUrl}/producto/${idProducto}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener detalle del producto:', error);
      throw error;
    }
  }

  obtenerCorreoElectronico(): string | null {
    return localStorage.getItem('usuarioCorreo');
  }

  async modificarUsuario(usuario: any): Promise<any> {
    const url = `${this.apiUrl}/modificar-usuario`;

    try {
      const result = await this.http.post(url, usuario).toPromise();
      console.log('Usuario modificado con éxito');
      return result;
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      throw error;
    }
  }
}



