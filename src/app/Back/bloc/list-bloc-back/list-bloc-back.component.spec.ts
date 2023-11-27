import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlocBackComponent } from './list-bloc-back.component';

describe('ListBlocBackComponent', () => {
  let component: ListBlocBackComponent;
  let fixture: ComponentFixture<ListBlocBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBlocBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBlocBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
