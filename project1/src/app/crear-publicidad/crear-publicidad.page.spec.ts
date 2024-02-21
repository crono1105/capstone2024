import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPublicidadPage } from './crear-publicidad.page';

describe('CrearPublicidadPage', () => {
  let component: CrearPublicidadPage;
  let fixture: ComponentFixture<CrearPublicidadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearPublicidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
