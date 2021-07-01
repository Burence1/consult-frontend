import { TestBed } from '@angular/core/testing';

import { AdditionalChatServiceService } from './additional-chat-service.service';

describe('AdditionalChatServiceService', () => {
  let service: AdditionalChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
