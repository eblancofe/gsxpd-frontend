import { TestBed } from '@angular/core/testing';

import { UnidadOrganizativaService } from './unidad-organizativa.service';

describe('UnidadOrganizativaService', () => {
  let service: UnidadOrganizativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadOrganizativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
