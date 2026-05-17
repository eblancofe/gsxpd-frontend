import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioList } from './cambio-list';

describe('CambioList', () => {
  let component: CambioList;
  let fixture: ComponentFixture<CambioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
