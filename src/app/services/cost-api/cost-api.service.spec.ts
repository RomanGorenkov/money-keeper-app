import { TestBed } from '@angular/core/testing';

import { CostApiService } from './cost-api.service';

describe('CostApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostApiService = TestBed.get(CostApiService);
    expect(service).toBeTruthy();
  });
});
