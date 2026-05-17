import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioForm } from './cambio-form';

describe('CambioForm', () => {
  let component: CambioForm;
  let fixture: ComponentFixture<CambioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
