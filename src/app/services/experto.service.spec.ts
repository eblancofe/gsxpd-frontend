import { TestBed } from '@angular/core/testing';

import { ExpertosService } from './experto.service';

describe('ExpertoService', () => {
  let service: ExpertosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
