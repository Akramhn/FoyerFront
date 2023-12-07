import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantProfileComponent } from './etudiant-profile.component';

describe('EtudiantProfileComponent', () => {
  let component: EtudiantProfileComponent;
  let fixture: ComponentFixture<EtudiantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
