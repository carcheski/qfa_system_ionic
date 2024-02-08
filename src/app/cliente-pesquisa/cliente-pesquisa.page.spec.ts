import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientePesquisaPage } from './cliente-pesquisa.page';

describe('ClientePesquisaPage', () => {
  let component: ClientePesquisaPage;
  let fixture: ComponentFixture<ClientePesquisaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClientePesquisaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
