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

  async modificarEmpresa(empresa: any): Promise<any> {
    const url = `${this.apiUrl}/modificar-empresa`;

    try {
      const result = await this.http.put(url, empresa).toPromise();
      console.log('Empresa modificada con éxito');
      return result;
    } catch (error) {
      console.error('Error al modificar la empresa:', error);
      throw error;
    }
  }

  async obtenerDetalleEmpresa(rutEmpresa: string): Promise<any> {
    const url = `${this.apiUrl}/detalle-empresa/${rutEmpresa}`;

    try {
      const empresa = await this.http.get<any>(url).toPromise();
      return empresa;
    } catch (error) {
      console.error('Error al obtener detalle de la empresa:', error);
      throw error;
    }
  }

  async modificarProducto(idProducto: number, productoModificado: any): Promise<any> {
    const url = `${this.apiUrl}/modificar-producto/${idProducto}`;

    try {
      const result = await this.http.put(url, productoModificado).toPromise();
      console.log('Producto modificado con éxito');
      return result;
    } catch (error) {
      console.error('Error al modificar el producto:', error);
      throw error;
    }
  }

  async obtenerActualizacionesPorProducto(idProducto: string): Promise<any[]> {
    try {
      const response = await this.http.get(`${this.apiUrl}/obtener-actualizaciones/${idProducto}`).toPromise();
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error al obtener actualizaciones del producto:', error);
      throw error;
    }
  }

  async valorarProducto(idProducto: string, valoracion: number, comentario: string): Promise<any> {
    const url = `${this.apiUrl}/valoracion-producto/${idProducto}`;
    const valoracionData = { valoracion, comentario };

    try {
      const result = await this.http.post(url, valoracionData).toPromise();
      console.log('Valoración realizada con éxito');
      return result;
    } catch (error) {
      console.error('Error al valorar el producto:', error);
      throw error;
    }
  }


  obtenerResenasPorProducto(idProducto: number): Promise<any> {
    const url = `${this.apiUrl}/obtener-resenas/${idProducto}`;

    return this.http.get(url).toPromise();
  }

  calcularPromedioValoracion(idProducto: string): Promise<any> {
    const url = `${this.apiUrl}/calcular-promedio/${idProducto}`;

    return this.http.get(url).toPromise();
  }

  async loginAdmin(credentials: any): Promise<any> {
    const url = `${this.apiUrl}/login-admin`;

    try {
      const result = await this.http.post(url, credentials).toPromise();

      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('usuarioCorreo', credentials.correo_electronico);
      console.log(localStorage.getItem('usuarioCorreo'));
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertarReporte(idValoracion: number): Promise<any> {
    const url = `${this.apiUrl}/insertar-reporte`; // Ajusta la URL según tu backend

    try {
      const estado = 'pendiente';

      const result = await this.http.post(url, { idValoracion, estado }).toPromise();
      console.log('Reporte insertado con éxito', result);
      return result;
    } catch (error) {
      console.error('Error al insertar el reporte', error);
      throw error;
    }
  }

  async obtenerListaDeReportes(): Promise<any[]> {
    const url = `${this.apiUrl}/listar-reportes`;

    try {
      const reportes = await this.http.get<any[]>(url).toPromise();
      return reportes || [];
    } catch (error) {
      console.error('Error al obtener la lista de reportes:', error);
      return [];
    }
  }

  async modificarComentarioValoracionProducto(idValoracion: string, nuevoComentario: string): Promise<any> {
    const url = `${this.apiUrl}/modificar-comentario-valoracion-producto/${idValoracion}`;

    try {
      const result = await this.http.put(url, { nuevoComentario }).toPromise();
      console.log('Comentario de valoración del producto modificado con éxito', result);
      return result;
    } catch (error) {
      console.error('Error al modificar el comentario de la valoración del producto:', error);
      throw error;
    }
  }

  async eliminarReporte(idReporte: string): Promise<any> {
    const url = `${this.apiUrl}/eliminar-reporte/${idReporte}`;

    try {
      const result = await this.http.delete(url).toPromise();
      console.log('Reporte eliminado con éxito', result);
      return result;
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
      throw error;
    }
  }
  async agregarPublicidad(publicidad: any): Promise<any> {
    const url = `${this.apiUrl}/insertar-publicidad`;
    try {
      const resultado = await this.http.post(url, publicidad).toPromise();
      return resultado;
    } catch (error) {
      console.error('Error al agregar publicidad:', error);
      throw error;
    }
  }

  async obtenerPublicidades(): Promise<any> {
    const url = `${this.apiUrl}/obtener-publicidades`;

    try {
      const publicidades = await this.http.get(url).toPromise();
      console.log('Publicidades obtenidas:', publicidades);
      return publicidades;
    } catch (error) {
      console.error('Error al obtener publicidades:', error);
      throw error;
    }
  }

  registrarAdmin(adminData: any): Promise<any> {
    const url = `${this.apiUrl}/registrar-admin`;
    return this.http.post(url, adminData).toPromise();
  }

  async listarAdministradores(): Promise<any> {
    const url = `${this.apiUrl}/listar-administradores`;

    try {
      const administradores = await this.http.get(url).toPromise();
      console.log('Administradores obtenidos con éxito:', administradores);
      return administradores;
    } catch (error) {
      console.error('Error al obtener administradores:', error);
      throw error;
    }
  }

  eliminarAdministrador(correoElectronico: string): Promise<any> {
    const url = `${this.apiUrl}/eliminar-administrador/${correoElectronico}`;

    return this.http.delete(url).toPromise();
  }

  async agregarCategoriaProducto(categoria: any): Promise<any> {
    const url = `${this.apiUrl}/agregar-categoria-producto`;

    try {
      const result = await this.http.post(url, categoria).toPromise();
      console.log('Categoría de producto agregada con éxito:', result);
      return result;
    } catch (error) {
      console.error('Error al agregar categoría de producto:', error);
      throw error;
    }
  }








}



