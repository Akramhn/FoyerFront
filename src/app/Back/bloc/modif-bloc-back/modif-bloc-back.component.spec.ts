import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifBlocBackComponent } from './modif-bloc-back.component';

describe('ModifBlocBackComponent', () => {
  let component: ModifBlocBackComponent;
  let fixture: ComponentFixture<ModifBlocBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifBlocBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifBlocBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
