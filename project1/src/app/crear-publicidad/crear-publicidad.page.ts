import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-publicidad',
  templateUrl: './crear-publicidad.page.html',
  styleUrls: ['./crear-publicidad.page.scss'],
})
export class CrearPublicidadPage implements OnInit {
  publicidad = {
    name_pbli: '',
    url_pbli: '',
    img_publicidad: null as string | null // Inicializa la imagen como null o string

  };

  constructor(private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async agregarPublicidad() {
    try {
      const resultado = await this.authService.agregarPublicidad(this.publicidad);
      console.log('Publicidad agregada con éxito:', resultado);
      await this.presentCustomAlert('¡Publicidad agregada con éxito!');
    } catch (error) {
      console.error('Error al agregar la publicidad:', error);
      await this.presentCustomAlert('¡Error al agregar la publicidad!');
    }
  }

  convertirImagenABase64(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.publicidad.img_publicidad = reader.result as string; // Asignar el resultado a tu modelo de publicidad
      };

      reader.readAsDataURL(file); // Esto convierte la imagen a Base64
    }
  }

  async presentCustomAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Agregar Publicidad',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
