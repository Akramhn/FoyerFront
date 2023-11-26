import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserTestComponent } from './reser-test.component';

describe('ReserTestComponent', () => {
  let component: ReserTestComponent;
  let fixture: ComponentFixture<ReserTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
