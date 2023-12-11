import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvenementfComponent } from './list-evenementf.component';

describe('ListEvenementfComponent', () => {
  let component: ListEvenementfComponent;
  let fixture: ComponentFixture<ListEvenementfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEvenementfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEvenementfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
