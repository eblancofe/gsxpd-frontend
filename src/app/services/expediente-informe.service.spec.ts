import { TestBed } from '@angular/core/testing';

import { ExpedienteInformeService } from './expediente-informe.service';

describe('ExpedienteInformeService', () => {
  let service: ExpedienteInformeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteInformeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
