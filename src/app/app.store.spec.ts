import { TestBed } from '@angular/core/testing';
import { AppState, AppStore } from './app.store';
import { NewsApiService } from './services/news-api.service';
import { of, skip, throwError } from 'rxjs';
import { Article } from './interfaces/news.interface';

describe('AppStore', () => {
  let appStore: AppStore;
  let newsApiServiceSpy: jasmine.SpyObj<NewsApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NewsApiService', ['getArticles$']);

    TestBed.configureTestingModule({
      providers: [AppStore, { provide: NewsApiService, useValue: spy }],
    });

    appStore = TestBed.inject(AppStore);
    newsApiServiceSpy = TestBed.inject(
      NewsApiService
    ) as jasmine.SpyObj<NewsApiService>;
  });

  it('should be created', () => {
    expect(appStore).toBeTruthy();
  });

  it('should initialize the state with an empty articles array', () => {
    appStore.state$.subscribe((state: AppState) => {
      expect(state.articles).toEqual([]);
    });
  });

  it('should initialize the state with a null articlesError', () => {
    appStore.state$.subscribe((state: AppState) => {
      expect(state.articlesError).toBeNull();
    });
  });

  describe('getArticles() method', () => {
    it('should update the state with the returned articles', (done: DoneFn) => {
      // GIVEN
      const query = 'fake query';
      const articles: Article[] = [
        { title: 'Fake title 1', url: 'fake url 1' },
        { title: 'Fake title 2', url: 'fake url 2' },
      ];
      newsApiServiceSpy.getArticles$.and.returnValue(of(articles));

      appStore.state$.pipe(skip(1)).subscribe({
        next: (state: AppState) => {
          // THEN
          expect(state.articles).toEqual(articles);
          done();
        },
      });

      // WHEN
      appStore.getArticles(of(query));
    });

    it('should set the articles property to an empty array and the articlesError property to null if the searchQuery is empty', (done: DoneFn) => {
      // GIVEN
      const query = '';

      appStore.state$.pipe(skip(1)).subscribe({
        next: (state: AppState) => {
          // THEN
          expect(state).toEqual({ articles: [], articlesError: null });
          done();
        },
      });

      // WHEN
      appStore.getArticles(of(query));
    });

    it('should update the state with an error message if an error occurs', (done: DoneFn) => {
      const query = 'fake query';
      const error = 'An error occurred';

      newsApiServiceSpy.getArticles$.and.returnValue(
        throwError(() => new Error(error))
      );

      appStore.state$.pipe(skip(1)).subscribe({
        next: (state: AppState) => {
          // THEN
          expect(state.articlesError).toBe(error);
          done();
        },
      });

      // WHEN
      appStore.getArticles(of(query));
    });
  });
});
