import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlocBackComponent } from './add-bloc-back.component';

describe('AddBlocBackComponent', () => {
  let component: AddBlocBackComponent;
  let fixture: ComponentFixture<AddBlocBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlocBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlocBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
