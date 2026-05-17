import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteSelectComponent } from './expediente-select.component';

describe('ExpedienteSelectComponent', () => {
  let component: ExpedienteSelectComponent;
  let fixture: ComponentFixture<ExpedienteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedienteSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
