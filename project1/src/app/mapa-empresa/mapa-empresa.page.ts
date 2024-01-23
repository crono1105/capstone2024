import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-mapa-empresa',
  templateUrl: './mapa-empresa.page.html',
  styleUrls: ['./mapa-empresa.page.scss'],
})
export class MapaEmpresaPage implements OnInit {
  map!: Map;
  private idEmpresa: string | undefined
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit() {
    const idEmpresa = this.route.snapshot.paramMap.get('id_empresa');
    
    if (idEmpresa) {
      this.authService.obtenerDetalleEmpresa(idEmpresa)
        .then(empresa => {
          if (empresa && empresa.latitud && empresa.longitud) {
            this.initMap(empresa.latitud, empresa.longitud);
          } else {
            console.error('Detalles de la empresa no disponibles o incompletos');
            // Manejar caso en que los detalles de la empresa no están disponibles
          }
        })
        .catch(error => console.error('Error al obtener detalles de la empresa:', error));
    } else {
      console.error('No se pudo obtener el ID de la empresa desde la ruta');
      // Manejar caso en que el ID de la empresa no está presente en la URL
    }
  }
  

  private initMap(latitud: number, longitud: number): void {
    // Coordenadas del punto (longitud, latitud)
    const coordinates = [longitud, latitud];

    // Crear un punto (Feature) con las coordenadas
    const pointFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates))
    });

    // Estilo del punto como un círculo rojo
    pointFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: 'red'
        }),
        stroke: new Stroke({
          color: 'black',
          width: 2
        })
      })
    }));

    // Crear una fuente vectorial y una capa para el punto
    const vectorSource = new VectorSource({
      features: [pointFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Crear el mapa con la capa del punto añadida
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer // Añadir la capa del punto al mapa
      ],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 17
      })
    });
  }
}
