import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaixaEstoquePage } from './baixa-estoque.page';

describe('BaixaEstoquePage', () => {
  let component: BaixaEstoquePage;
  let fixture: ComponentFixture<BaixaEstoquePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaixaEstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
