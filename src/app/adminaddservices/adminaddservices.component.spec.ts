import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddservicesComponent } from './adminaddservices.component';

describe('AdminaddservicesComponent', () => {
  let component: AdminaddservicesComponent;
  let fixture: ComponentFixture<AdminaddservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
