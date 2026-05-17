import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignificatividadForm } from './significatividad-form';

describe('SignificatividadForm', () => {
  let component: SignificatividadForm;
  let fixture: ComponentFixture<SignificatividadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignificatividadForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignificatividadForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
