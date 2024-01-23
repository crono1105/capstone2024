import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarValoracionPage } from './agregar-valoracion.page';

describe('AgregarValoracionPage', () => {
  let component: AgregarValoracionPage;
  let fixture: ComponentFixture<AgregarValoracionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarValoracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
