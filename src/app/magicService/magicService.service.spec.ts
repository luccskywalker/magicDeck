/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MagicServiceService } from './magicService.service';

describe('Service: MagicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagicServiceService]
    });
  });

  it('should ...', inject([MagicServiceService], (service: MagicServiceService) => {
    expect(service).toBeTruthy();
  }));
});
