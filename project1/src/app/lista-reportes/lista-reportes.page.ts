import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-lista-reportes',
  templateUrl: './lista-reportes.page.html',
  styleUrls: ['./lista-reportes.page.scss'],
})
export class ListaReportesPage implements OnInit {
  public reportes: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.obtenerListaDeReportes();
  }
  async obtenerListaDeReportes() {
    try {
      this.reportes = await this.authService.obtenerListaDeReportes();
    } catch (error) {
      console.error('Error al obtener la lista de reportes en el componente:', error);
    }
  }

  async modificarComentarioValoracion(idValoracion: string) {
    try {
      const nuevoComentario = " ";
      await this.authService.modificarComentarioValoracionProducto(idValoracion, nuevoComentario);
      console.log('Comentario de valoración del producto modificado con éxito');
    } catch (error) {
      console.error('Error al modificar el comentario de la valoración del producto en el componente:', error);
    }
  }

  async eliminarReporte(idReporte: string) {
    try {
      await this.authService.eliminarReporte(idReporte);
      console.log('Reporte eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el reporte en el componente:', error);
    }
  }

  modificarandeliminar(idReporte: string, idValoracion :string){
    this.eliminarReporte(idReporte);
    this.modificarComentarioValoracion(idValoracion);
  }

}
