import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabulatedValueReportComponent } from './tabulated-value-report.component';

describe('TabulatedValueReportComponent', () => {
  let component: TabulatedValueReportComponent;
  let fixture: ComponentFixture<TabulatedValueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabulatedValueReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabulatedValueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
