import { TestBed, inject } from '@angular/core/testing';

import { TeamSpeakService } from './teamspeak.service';

describe('TeamSpeakService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamSpeakService]
    });
  });

  it('should be created', inject([TeamSpeakService], (service: TeamSpeakService) => {
    expect(service).toBeTruthy();
  }));
});
