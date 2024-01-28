import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-lista-reportes',
  templateUrl: './lista-reportes.page.html',
  styleUrls: ['./lista-reportes.page.scss'],
})
export class ListaReportesPage implements OnInit {
  public reportes: any[] = [];

  constructor(private authService: AuthService,private alertController: AlertController) { }

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
      this.presentCustomAlert('¡COMENTARIO DEL REPORTE ELIMINADO!');
    } catch (error) {
      console.error('Error al modificar el comentario de la valoración del producto en el componente:', error);
    }
  }

  async eliminarReporte(idReporte: string) {
    try {
      await this.authService.eliminarReporte(idReporte);
      console.log('Proceso terminado');
      await this.presentCustomAlert('¡Reporte elimininado!');
    } catch (error) {
      console.error('Error al eliminar el reporte en el componente:', error);
    }
  }

  modificarandeliminar(idReporte: string, idValoracion :string){
    this.modificarComentarioValoracion(idValoracion);
    this.eliminarReporte(idReporte);
   
  }

  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'ADMINSTRADOR ',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
