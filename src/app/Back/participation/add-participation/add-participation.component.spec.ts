import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipationComponent } from './add-participation.component';

describe('AddParticipationComponent', () => {
  let component: AddParticipationComponent;
  let fixture: ComponentFixture<AddParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParticipationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
