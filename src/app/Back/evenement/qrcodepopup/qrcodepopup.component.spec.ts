import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodepopupComponent } from './qrcodepopup.component';

describe('QrcodepopupComponent', () => {
  let component: QrcodepopupComponent;
  let fixture: ComponentFixture<QrcodepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
