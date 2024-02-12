import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoNovoMesaPage } from './pedido-novo-mesa.page';

describe('PedidoNovoMesaPage', () => {
  let component: PedidoNovoMesaPage;
  let fixture: ComponentFixture<PedidoNovoMesaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoNovoMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
