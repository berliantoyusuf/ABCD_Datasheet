import { TestBed, inject } from '@angular/core/testing';

import { DatasheetService } from './datasheet.service';

describe('DatasheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasheetService]
    });
  });

  it('should be created', inject([DatasheetService], (service: DatasheetService) => {
    expect(service).toBeTruthy();
  }));
});
