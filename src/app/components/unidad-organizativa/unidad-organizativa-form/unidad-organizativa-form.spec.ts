import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadOrganizativaForm } from './unidad-organizativa-form';

describe('UnidadOrganizativaForm', () => {
  let component: UnidadOrganizativaForm;
  let fixture: ComponentFixture<UnidadOrganizativaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadOrganizativaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadOrganizativaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
