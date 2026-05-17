import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadorForm } from './evaluador-form';

describe('EvaluadorForm', () => {
  let component: EvaluadorForm;
  let fixture: ComponentFixture<EvaluadorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluadorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluadorForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
