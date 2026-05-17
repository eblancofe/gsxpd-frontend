import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteInformeOrganizativaComponent } from './expediente-informe-organizativa.component';

describe('ExpedienteInformeOrganizativaComponent', () => {
  let component: ExpedienteInformeOrganizativaComponent;
  let fixture: ComponentFixture<ExpedienteInformeOrganizativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedienteInformeOrganizativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteInformeOrganizativaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
