import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarEmpresaPage } from './agregar-empresa.page';

describe('AgregarEmpresaPage', () => {
  let component: AgregarEmpresaPage;
  let fixture: ComponentFixture<AgregarEmpresaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
