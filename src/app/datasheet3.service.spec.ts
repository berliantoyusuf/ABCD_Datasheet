import { TestBed, inject } from '@angular/core/testing';

import { Datasheet3Service } from './datasheet3.service';

describe('Datasheet3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Datasheet3Service]
    });
  });

  it('should be created', inject([Datasheet3Service], (service: Datasheet3Service) => {
    expect(service).toBeTruthy();
  }));
});
