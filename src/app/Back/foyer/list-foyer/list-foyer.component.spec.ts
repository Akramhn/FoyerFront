import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoyerComponent } from './list-foyer.component';

describe('ListFoyerComponent', () => {
  let component: ListFoyerComponent;
  let fixture: ComponentFixture<ListFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
