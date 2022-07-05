import { TestBed } from '@angular/core/testing';

import { LoginsucessService } from './loginsucess.service';

describe('LoginsucessService', () => {
  let service: LoginsucessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginsucessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
