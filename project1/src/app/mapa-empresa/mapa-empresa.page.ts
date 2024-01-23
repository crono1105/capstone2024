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

@Component({
  selector: 'app-mapa-empresa',
  templateUrl: './mapa-empresa.page.html',
  styleUrls: ['./mapa-empresa.page.scss'],
})
export class MapaEmpresaPage implements OnInit {
  map!: Map;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    // Coordenadas del punto (longitud, latitud)
    const coordinates = [-3.703790, 40.416775]; // Ejemplo: Madrid

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
