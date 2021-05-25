/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilterTreeService } from './filter-tree.service';

describe('Service: FilterTree', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterTreeService]
    });
  });

  it('should ...', inject([FilterTreeService], (service: FilterTreeService) => {
    expect(service).toBeTruthy();
  }));
});
