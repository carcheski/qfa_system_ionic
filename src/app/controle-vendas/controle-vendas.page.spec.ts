import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControleVendasPage } from './controle-vendas.page';

describe('ControleVendasPage', () => {
  let component: ControleVendasPage;
  let fixture: ComponentFixture<ControleVendasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ControleVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
