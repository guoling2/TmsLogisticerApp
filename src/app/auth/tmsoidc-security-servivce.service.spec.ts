import { TestBed } from '@angular/core/testing';

import { TmsoidcSecurityServivceService } from './tmsoidc-security-servivce.service';

describe('TmsoidcSecurityServivceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmsoidcSecurityServivceService = TestBed.get(TmsoidcSecurityServivceService);
    expect(service).toBeTruthy();
  });
});
