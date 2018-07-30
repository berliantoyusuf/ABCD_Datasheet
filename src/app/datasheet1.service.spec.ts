import { TestBed, inject } from '@angular/core/testing';

import { Datasheet1Service } from './datasheet1.service';

describe('Datasheet1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Datasheet1Service]
    });
  });

  it('should be created', inject([Datasheet1Service], (service: Datasheet1Service) => {
    expect(service).toBeTruthy();
  }));
});
