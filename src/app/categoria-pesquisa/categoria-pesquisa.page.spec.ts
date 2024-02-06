import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaPesquisaPage } from './categoria-pesquisa.page';

describe('CategoriaPesquisaPage', () => {
  let component: CategoriaPesquisaPage;
  let fixture: ComponentFixture<CategoriaPesquisaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriaPesquisaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
