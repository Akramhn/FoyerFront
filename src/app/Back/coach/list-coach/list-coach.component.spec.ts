import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoachComponent } from './list-coach.component';

describe('ListCoachComponent', () => {
  let component: ListCoachComponent;
  let fixture: ComponentFixture<ListCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
