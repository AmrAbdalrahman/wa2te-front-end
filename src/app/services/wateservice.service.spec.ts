import { TestBed, inject } from '@angular/core/testing';

import { WateserviceService } from './wateservice.service';

describe('WateserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WateserviceService]
    });
  });

  it('should be created', inject([WateserviceService], (service: WateserviceService) => {
    expect(service).toBeTruthy();
  }));
});
