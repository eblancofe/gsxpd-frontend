import { TestBed } from '@angular/core/testing';

import { SignificatividadService } from './significatividad.service';

describe('SignificatividadService', () => {
  let service: SignificatividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignificatividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
