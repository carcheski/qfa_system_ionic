import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoDetailPage } from './produto-detail.page';

describe('ProdutoDetailPage', () => {
  let component: ProdutoDetailPage;
  let fixture: ComponentFixture<ProdutoDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProdutoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
