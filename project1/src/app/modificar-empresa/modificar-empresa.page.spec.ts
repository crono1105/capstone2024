import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarEmpresaPage } from './modificar-empresa.page';

describe('ModificarEmpresaPage', () => {
  let component: ModificarEmpresaPage;
  let fixture: ComponentFixture<ModificarEmpresaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
