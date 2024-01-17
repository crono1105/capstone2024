import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-listado-producto-empresa',
  templateUrl: './listado-producto-empresa.page.html',
  styleUrls: ['./listado-producto-empresa.page.scss'],
})
export class ListadoProductoEmpresaPage implements OnInit {
  productos: any[] = [];
  rutEmpresa: string | null = null;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rutEmpresa = params.get('rutEmpresa');
      if (this.rutEmpresa) {
        this.cargarProductos();
      }
    });
  }

  async cargarProductos() {
    if (this.rutEmpresa !== null) {
      try {
        this.productos = await this.authService.obtenerProductosPorEmpresa(this.rutEmpresa);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    } else {
      console.error('RUT de la empresa es null');
    }
  }
}
