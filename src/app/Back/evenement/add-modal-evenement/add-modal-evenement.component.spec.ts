import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalEvenementComponent } from './add-modal-evenement.component';

describe('AddModalEvenementComponent', () => {
  let component: AddModalEvenementComponent;
  let fixture: ComponentFixture<AddModalEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModalEvenementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModalEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
