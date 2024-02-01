import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoPesquisaPage } from './produto-pesquisa.page';

describe('ProdutoPesquisaPage', () => {
  let component: ProdutoPesquisaPage;
  let fixture: ComponentFixture<ProdutoPesquisaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProdutoPesquisaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
