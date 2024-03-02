import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarAdministradoresPage } from './listar-administradores.page';

describe('ListarAdministradoresPage', () => {
  let component: ListarAdministradoresPage;
  let fixture: ComponentFixture<ListarAdministradoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarAdministradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
