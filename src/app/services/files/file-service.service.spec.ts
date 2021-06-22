import { TestBed } from '@angular/core/testing';
import { FileService } from 'src/app/services/files/file-service.service';

describe('FileServiceService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
