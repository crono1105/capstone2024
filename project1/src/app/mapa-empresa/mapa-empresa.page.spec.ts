import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaEmpresaPage } from './mapa-empresa.page';

describe('MapaEmpresaPage', () => {
  let component: MapaEmpresaPage;
  let fixture: ComponentFixture<MapaEmpresaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapaEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
