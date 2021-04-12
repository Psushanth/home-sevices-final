import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesdescriptionComponent } from './servicesdescription.component';

describe('ServicesdescriptionComponent', () => {
  let component: ServicesdescriptionComponent;
  let fixture: ComponentFixture<ServicesdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesdescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
