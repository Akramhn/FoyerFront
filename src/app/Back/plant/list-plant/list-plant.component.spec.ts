import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlantComponent } from './list-plant.component';

describe('ListPlantComponent', () => {
  let component: ListPlantComponent;
  let fixture: ComponentFixture<ListPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
