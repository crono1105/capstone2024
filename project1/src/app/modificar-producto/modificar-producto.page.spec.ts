import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductoPage } from './modificar-producto.page';

describe('ModificarProductoPage', () => {
  let component: ModificarProductoPage;
  let fixture: ComponentFixture<ModificarProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
