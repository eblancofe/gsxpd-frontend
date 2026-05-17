import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignificatividadList } from './significatividad-list';

describe('SignificatividadList', () => {
  let component: SignificatividadList;
  let fixture: ComponentFixture<SignificatividadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignificatividadList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignificatividadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
