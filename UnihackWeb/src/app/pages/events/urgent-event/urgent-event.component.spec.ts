import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentEventComponent } from './urgent-event.component';

describe('UrgentEventComponent', () => {
  let component: UrgentEventComponent;
  let fixture: ComponentFixture<UrgentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
