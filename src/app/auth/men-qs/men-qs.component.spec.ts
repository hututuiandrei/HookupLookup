import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenQsComponent } from './men-qs.component';

describe('MenQsComponent', () => {
  let component: MenQsComponent;
  let fixture: ComponentFixture<MenQsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenQsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
