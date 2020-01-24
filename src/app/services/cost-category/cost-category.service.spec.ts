import { TestBed } from '@angular/core/testing';

import { CostCategoryService } from './cost-category.service';

describe('CostCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostCategoryService = TestBed.get(CostCategoryService);
    expect(service).toBeTruthy();
  });
});
