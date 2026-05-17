import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadorList } from './evaluador-list';

describe('EvaluadorList', () => {
  let component: EvaluadorList;
  let fixture: ComponentFixture<EvaluadorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluadorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluadorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
