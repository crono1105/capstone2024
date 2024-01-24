import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaReportesPage } from './lista-reportes.page';

describe('ListaReportesPage', () => {
  let component: ListaReportesPage;
  let fixture: ComponentFixture<ListaReportesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
