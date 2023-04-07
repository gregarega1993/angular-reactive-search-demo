import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Article, ArticleResponse } from '../interfaces/news.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private httpClient = inject(HttpClient);

  public getArticles$(searchValue: string): Observable<Article[]> {
    return this.httpClient
      .get<ArticleResponse>(
        `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${environment.newsApiKey}`
      )
      .pipe(
        map((articleResponse: ArticleResponse) => articleResponse.articles),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
