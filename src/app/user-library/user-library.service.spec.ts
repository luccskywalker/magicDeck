/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLibraryService } from './user-library.service';

describe('Service: UserLibrary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLibraryService]
    });
  });

  it('should ...', inject([UserLibraryService], (service: UserLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
