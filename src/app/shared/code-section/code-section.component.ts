import { combineLatest, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation
} from '@angular/core';

export type Language = 'ts' | 'html' | 'css';

@Component({
  selector: 'app-code-section',
  templateUrl: './code-section.component.html',
  styleUrls: ['./code-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSectionComponent {
  @HostBinding('class.app-code-section')
  public hasBoundClass = true;

  @Input()
  public set exampleID(value: number) {
    this.exampleIDSubject.next(value);
  }

  @Input()
  public set language(value: Language) {
    this.languageSubject.next(value);
  }

  public exampleIDSubject = new ReplaySubject<number>();
  public languageSubject = new ReplaySubject<Language>();

  public code$ = combineLatest([this.exampleIDSubject, this.languageSubject]).pipe(
    switchMap(([exampleID, language]: [number, Language]) =>
      this.http.get(`assets/examples/${exampleID}/example.component.${language}`, { responseType: 'text' }),
    ),
    shareReplay(1),
  );

  public hljsLanguages$ = this.languageSubject.pipe(
    map((language: Language) => [language]),
    shareReplay(1),
  );

  public constructor(private http: HttpClient) {}
}
