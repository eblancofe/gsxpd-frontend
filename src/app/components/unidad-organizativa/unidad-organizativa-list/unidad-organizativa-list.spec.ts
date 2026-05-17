import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadOrganizativaList } from './unidad-organizativa-list';

describe('UnidadOrganizativaList', () => {
  let component: UnidadOrganizativaList;
  let fixture: ComponentFixture<UnidadOrganizativaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadOrganizativaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadOrganizativaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
