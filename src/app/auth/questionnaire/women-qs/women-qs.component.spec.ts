import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenQsComponent } from './women-qs.component';

describe('WomenQsComponent', () => {
  let component: WomenQsComponent;
  let fixture: ComponentFixture<WomenQsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenQsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
