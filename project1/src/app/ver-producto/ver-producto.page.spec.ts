import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerProductoPage } from './ver-producto.page';

describe('VerProductoPage', () => {
  let component: VerProductoPage;
  let fixture: ComponentFixture<VerProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
