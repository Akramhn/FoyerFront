import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalleComponent } from './list-salle.component';

describe('ListSalleComponent', () => {
  let component: ListSalleComponent;
  let fixture: ComponentFixture<ListSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
