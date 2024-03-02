import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCategoriaPage } from './agregar-categoria.page';

describe('AgregarCategoriaPage', () => {
  let component: AgregarCategoriaPage;
  let fixture: ComponentFixture<AgregarCategoriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
