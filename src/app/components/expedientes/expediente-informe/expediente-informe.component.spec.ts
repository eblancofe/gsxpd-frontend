import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteInformeComponent } from './expediente-informe.component';

describe('ExpedienteInformeComponent', () => {
  let component: ExpedienteInformeComponent;
  let fixture: ComponentFixture<ExpedienteInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedienteInformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteInformeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
