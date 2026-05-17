import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitularidadList } from './titularidad-list';

describe('TitularidadList', () => {
  let component: TitularidadList;
  let fixture: ComponentFixture<TitularidadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitularidadList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitularidadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
