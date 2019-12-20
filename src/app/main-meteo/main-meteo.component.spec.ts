import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMeteoComponent } from './main-meteo.component';

describe('MainMeteoComponent', () => {
  let component: MainMeteoComponent;
  let fixture: ComponentFixture<MainMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
