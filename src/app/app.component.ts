import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Article } from './interfaces/news.interface';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ReactiveFormsModule],
  providers: [AppStore],
  styles: [],
  template: `
    <label>Search: </label>
    <input type="search" [formControl]="searchControl" />
    <ng-container *ngIf="vm$ | async as vm">
      <p *ngIf="vm.articlesError">
        {{ vm.articlesError }}
      </p>
      <ul>
        <li *ngFor="let article of vm.articles; trackBy: trackByFn">
          {{ article.title }}
        </li>
      </ul>
    </ng-container>
  `,
})
export class AppComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private appStore = inject(AppStore);

  public searchControl = this.formBuilder.nonNullable.control('');
  public vm$ = this.appStore.vm$;

  public ngOnInit(): void {
    this.appStore.getArticles(this.searchControl.valueChanges);
  }

  public trackByFn(index: number, item: Article): string {
    return item.url;
  }
}
