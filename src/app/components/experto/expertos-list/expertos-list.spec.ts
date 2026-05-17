import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertosList } from './expertos-list';

describe('ExpertosList', () => {
  let component: ExpertosList;
  let fixture: ComponentFixture<ExpertosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
