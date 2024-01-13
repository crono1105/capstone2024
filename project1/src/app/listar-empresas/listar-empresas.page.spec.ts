import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEmpresasPage } from './listar-empresas.page';

describe('ListarEmpresasPage', () => {
  let component: ListarEmpresasPage;
  let fixture: ComponentFixture<ListarEmpresasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarEmpresasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
