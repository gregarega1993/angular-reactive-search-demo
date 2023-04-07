import { TestBed } from '@angular/core/testing';
import { NewsApiService } from '../services/news-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewsApiService', () => {
  let service: NewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
