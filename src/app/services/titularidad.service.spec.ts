import { TestBed } from '@angular/core/testing';

import { TitularidadService } from './titularidad.service';

describe('TitularidadService', () => {
  let service: TitularidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitularidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
