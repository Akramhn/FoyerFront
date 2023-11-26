import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUniversityComponent } from './list-university.component';

describe('ListUniversityComponent', () => {
  let component: ListUniversityComponent;
  let fixture: ComponentFixture<ListUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUniversityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
