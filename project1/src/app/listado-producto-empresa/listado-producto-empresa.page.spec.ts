import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoProductoEmpresaPage } from './listado-producto-empresa.page';

describe('ListadoProductoEmpresaPage', () => {
  let component: ListadoProductoEmpresaPage;
  let fixture: ComponentFixture<ListadoProductoEmpresaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListadoProductoEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
