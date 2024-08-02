import { TestBed } from '@angular/core/testing';

import { Lib18Service } from './lib-18.service';

describe('Lib18Service', () => {
  let service: Lib18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lib18Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
