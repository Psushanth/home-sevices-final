import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainservicesComponent } from './mainservices.component';

describe('MainservicesComponent', () => {
  let component: MainservicesComponent;
  let fixture: ComponentFixture<MainservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
