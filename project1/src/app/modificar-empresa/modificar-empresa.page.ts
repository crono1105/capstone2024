import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Ajusta la ruta según la estructura de tu proyecto

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.page.html',
  styleUrls: ['./modificar-empresa.page.scss'],
})
export class ModificarEmpresaPage implements OnInit {
  empresa: any = {};
  comunas: any[] = [];
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const rutEmpresa = this.route.snapshot.paramMap.get('rut_empresa');
    this.authService.obtenerComunas().then(comunas => {
      this.comunas = comunas;
    });
    if (rutEmpresa) {
      this.authService.obtenerDetalleEmpresa(rutEmpresa).then((empresa: any) => {
        this.empresa = empresa;
        console.log(empresa);
      });
    } else {
      console.error('El parámetro rut_empresa es nulo.');
    }
  }

  submitForm() {
    console.log(this.empresa);
    this.authService.modificarEmpresa(this.empresa).then(() => {
      console.log('Empresa modificada con éxito');
      this.router.navigate(['/lista-empresas']); // Redirige a la página de lista de empresas
    }).catch(error => {
      console.error('Error al modificar la empresa:', error);
    });
  }
}
