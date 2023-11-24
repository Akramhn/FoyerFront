import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackoffComponent } from './backoff.component';

describe('BackoffComponent', () => {
  let component: BackoffComponent;
  let fixture: ComponentFixture<BackoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
