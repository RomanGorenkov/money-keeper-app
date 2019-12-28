import { TestBed } from '@angular/core/testing';

import { ModalWindowServiceService } from './modal-window-service.service';

describe('ModalWindowServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalWindowServiceService = TestBed.get(ModalWindowServiceService);
    expect(service).toBeTruthy();
  });
});
