import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';

import {
    ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostBinding, Input, QueryList,
    Renderer2, ViewChildren, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { findColorBetween } from '../color-utils';

const DEFAULT_MAX_VALUE = 5;

@Component({
  selector: 'ngx-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxRatingComponent),
      multi: true,
    },
  ],
})
export class NgxRatingComponent implements ControlValueAccessor {
  @HostBinding('class.ngx-rating')
  public hasBoundClass = true;

  @HostBinding('attr.aria-label')
  public ariaLabel = 'Stars to give an opinion';

  @ViewChildren('starAnimationContainer')
  public stars: QueryList<ElementRef> | undefined;

  private ratingSubject = new Subject<number>();
  public rating$ = this.ratingSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap((rating: number) => this.propagateChange(rating)),
    shareReplay(1),
    startWith(undefined),
  );

  private hoveredRatingSubject = new BehaviorSubject<number | undefined>(undefined);
  public hoveredRating$ = this.hoveredRatingSubject.pipe(shareReplay(1));

  public ratingToShow$ = combineLatest([this.rating$, this.hoveredRating$]).pipe(
    map(([rating, hoveredRating]: [number | undefined, number | undefined]) => (rating ? rating : hoveredRating)),
    shareReplay(1),
  );

  public starIndexToShow$ = this.ratingToShow$.pipe(
    map((rating: number | undefined) => (rating ? rating - 1 : rating)),
    shareReplay(1),
  );

  private maxValueSubject = new BehaviorSubject<number>(DEFAULT_MAX_VALUE);
  public maxValue$ = this.maxValueSubject.pipe(shareReplay(1));

  public starRatingIterator$ = this.maxValue$.pipe(
    map((maxValue: number) =>
      Array<number>(maxValue)
        .fill(0)
        .map((_val: number, starIndex: number) => starIndex + 1),
    ),
  );

  private hexColorSubject = new BehaviorSubject<string | string[]>([
    '#f44334',
    '#ffa726',
    '#fdd835',
    '#cddc39',
    '#8bc34a',
  ]);

  @Input()
  public emptyColor = '#eaeaea';

  @Input()
  public set maxValue(maxValue: number) {
    this.maxValueSubject.next(maxValue);
  }

  @Input()
  public set hexColor(colors: string | string[]) {
    this.hexColorSubject.next(colors);
  }

  @Input()
  public delayPerStarMs = 85;

  @Input()
  public particlesDistanceEm = 1.5;

  @Input()
  public particlesDisabled = false;

  private computeAriaAttrLabelSubject = new BehaviorSubject<(starCount: number) => string>(
    (starCount: number) => starCount + ' ' + (starCount > 1 ? 'stars' : 'star'),
  );

  @Input()
  public set computeAriaAttrLabel(fn: (starCount: number) => string) {
    this.computeAriaAttrLabelSubject.next(fn);
  }

  public starAriaLabels$ = combineLatest([this.computeAriaAttrLabelSubject, this.maxValue$]).pipe(
    map(([computeAriaAttrLabel, maxValue]: [(starCount: number) => string, number]) =>
      Array<string>(maxValue)
        .fill('')
        .map((_val: string, starIndex: number) => computeAriaAttrLabel(starIndex + 1)),
    ),
    shareReplay(1),
  );

  public colors$ = combineLatest([this.hexColorSubject, this.maxValue$]).pipe(
    map(([hexColor, maxValue]: [string | string[], number]) =>
      Array<string>(maxValue)
        .fill('')
        .map((_val: string, starIndex: number) => {
          if (typeof hexColor === 'string') {
            return hexColor;
          }
          const hexColors = hexColor as string[];
          if (hexColors.length >= maxValue) {
            return hexColors[starIndex];
          }

          const colorRatio = (starIndex * (hexColors.length - 1)) / (maxValue - 1);
          return findColorBetween(
            hexColors[Math.ceil(colorRatio)],
            hexColors[Math.floor(colorRatio)],
            colorRatio - Math.floor(colorRatio),
          );
        }),
    ),
    shareReplay(1),
  );

  public constructor(private renderer: Renderer2) {}

  public onStarClicked(rating: number): void {
    this.bounceAnimateToRating(rating);
    this.ratingSubject.next(rating);
  }

  private bounceAnimateToRating(rating: number): void {
    if (!this.stars) {
      return;
    }

    const stars = this.stars.toArray().map((elemRef: ElementRef) => elemRef.nativeElement as HTMLElement);
    for (let i = 0; i <= rating - 1; ++i) {
      const star = stars[i];
      this.renderer.removeClass(star, 'ngx-rating__star__animation-container--animating');
      setTimeout(() => {
        this.renderer.addClass(star, 'ngx-rating__star__animation-container--animating');
      }, 10);
    }
  }

  public onMouseEnter(rating: number): void {
    this.hoveredRatingSubject.next(rating);
  }

  public onMouseLeave(_rating: number): void {
    this.hoveredRatingSubject.next(undefined);
  }

  /////////////////////////////////////////
  // ControlValueAccessor implementation //
  /////////////////////////////////////////
  public propagateChange = (_rating: number) => {};

  public writeValue(rating: number): void {
    this.ratingSubject.next(rating);
  }

  public registerOnChange(fn: (_rating: number) => any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {}
}
