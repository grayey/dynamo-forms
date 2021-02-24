import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormioComponent } from './app-formio.component';

describe('FormioComponent', () => {
  let component: AppFormioComponent;
  let fixture: ComponentFixture<AppFormioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFormioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFormioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
