import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertosForm } from './expertos-form';

describe('ExpertosForm', () => {
  let component: ExpertosForm;
  let fixture: ComponentFixture<ExpertosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertosForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
