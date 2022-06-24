import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPlumbNodeComponent } from './ngx-plumb-node.component';

describe('NgxPlumbNodeComponent', () => {
  let component: NgxPlumbNodeComponent;
  let fixture: ComponentFixture<NgxPlumbNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPlumbNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPlumbNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
