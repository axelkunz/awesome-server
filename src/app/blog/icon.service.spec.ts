/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IconService } from './icon.service';

describe('Service: Icon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconService]
    });
  });

  it('should ...', inject([IconService], (service: IconService) => {
    expect(service).toBeTruthy();
  }));
});
