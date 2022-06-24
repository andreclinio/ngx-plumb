import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlumbScreenComponent } from './ngx-plumb-screen.component';

describe('ScreenComponent', () => {
  let component: NgxPlumbScreenComponent;
  let fixture: ComponentFixture<NgxPlumbScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPlumbScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlumbScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
