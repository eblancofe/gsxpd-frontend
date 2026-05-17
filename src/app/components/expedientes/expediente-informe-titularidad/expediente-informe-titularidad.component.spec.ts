import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteInformeTitularidadComponent } from './expediente-informe-titularidad.component';

describe('ExpedienteInformeTitularidadComponent', () => {
  let component: ExpedienteInformeTitularidadComponent;
  let fixture: ComponentFixture<ExpedienteInformeTitularidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedienteInformeTitularidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteInformeTitularidadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
