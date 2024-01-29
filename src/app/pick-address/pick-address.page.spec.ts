import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickAddressPage } from './pick-address.page';

describe('PickAddressPage', () => {
  let component: PickAddressPage;
  let fixture: ComponentFixture<PickAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PickAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
