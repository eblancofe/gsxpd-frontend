import { TestBed } from '@angular/core/testing';

import { PermisosPanelService } from './permisos-panel.service';

describe('PermisosPanelService', () => {
  let service: PermisosPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
