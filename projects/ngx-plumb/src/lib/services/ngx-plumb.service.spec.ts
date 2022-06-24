import { TestBed } from '@angular/core/testing';

import { NgxPlumbService } from './ngx-plumb.service';

describe('NgxPlumbService', () => {
  let service: NgxPlumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPlumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
