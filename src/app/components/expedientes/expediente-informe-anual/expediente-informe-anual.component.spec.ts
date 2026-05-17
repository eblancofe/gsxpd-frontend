import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteInformeAnualComponent } from './expediente-informe-anual.component';

describe('ExpedienteInformeAnualComponent', () => {
  let component: ExpedienteInformeAnualComponent;
  let fixture: ComponentFixture<ExpedienteInformeAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedienteInformeAnualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteInformeAnualComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
