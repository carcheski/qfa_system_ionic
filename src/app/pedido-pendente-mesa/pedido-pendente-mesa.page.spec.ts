import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPendenteMesaPage } from './pedido-pendente-mesa.page';

describe('PedidoPendenteMesaPage', () => {
  let component: PedidoPendenteMesaPage;
  let fixture: ComponentFixture<PedidoPendenteMesaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoPendenteMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
