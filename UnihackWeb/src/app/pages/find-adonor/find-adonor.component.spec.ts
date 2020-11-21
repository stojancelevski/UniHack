import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindADonorComponent } from './find-adonor.component';

describe('FindADonorComponent', () => {
  let component: FindADonorComponent;
  let fixture: ComponentFixture<FindADonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindADonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindADonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
