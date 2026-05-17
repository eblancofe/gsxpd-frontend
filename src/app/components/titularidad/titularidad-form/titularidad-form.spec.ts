import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitularidadForm } from './titularidad-form';

describe('TitularidadForm', () => {
  let component: TitularidadForm;
  let fixture: ComponentFixture<TitularidadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitularidadForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitularidadForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
