import { BehaviorSubject, combineLatest, merge, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';

import {
    ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, forwardRef, HostBinding, Input,
    QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation
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

  @ViewChildren('starContainer')
  public starContainers: QueryList<ElementRef> | undefined;

  @ViewChildren('star')
  public stars: QueryList<ElementRef> | undefined;

  @ViewChild('defaultParticle')
  public defaultParticle: TemplateRef<any> | undefined;

  private ratingSubject = new Subject<number>();
  public rating$ = this.ratingSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap((rating: number) => this.propagateChange(rating)),
    shareReplay(1),
    startWith(0),
  );

  private hoveredStarIndexSubject = new BehaviorSubject<number | undefined>(undefined);
  public hoveredStarIndex$ = this.hoveredStarIndexSubject.pipe(shareReplay(1));

  public starIndexToShow$ = combineLatest([this.rating$, this.hoveredStarIndex$]).pipe(
    map(([rating, hoveredStarIndex]: [number, number | undefined]) =>
      hoveredStarIndex !== undefined ? hoveredStarIndex : rating - 1,
    ),
  );

  private maxValueSubject = new BehaviorSubject<number>(DEFAULT_MAX_VALUE);
  public maxValue$ = this.maxValueSubject.pipe(shareReplay(1));

  public starIterator$ = this.maxValue$.pipe(
    map((maxValue: number) =>
      Array<number>(maxValue)
        .fill(0)
        .map((_val: number, starIndex: number) => starIndex),
    ),
  );

  private startHexColorSubject = new BehaviorSubject<string>('#f44334');
  private endHexColorSubject = new BehaviorSubject<string>('#4caf50');
  private colorsInputRangeSubject = new ReplaySubject<string[]>();

  @Input()
  public emptyColor = '#eaeaea';

  @Input()
  public set maxValue(maxValue: number) {
    this.maxValueSubject.next(maxValue);
  }

  @Input()
  public set startHexColor(color: string) {
    this.startHexColorSubject.next(color);
  }

  @Input()
  public set endHexColor(color: string) {
    this.endHexColorSubject.next(color);
  }

  @Input()
  public set colors(colors: string[]) {
    this.colorsInputRangeSubject.next(colors);
  }

  @Input()
  public delayPerStarMs = 85;

  @Input()
  public particlesDistanceEm = 1.5;

  @Input()
  public particlesDisabled = false;

  private colorsAutocomputeRange$ = combineLatest([
    this.startHexColorSubject,
    this.endHexColorSubject,
    this.maxValue$,
  ]).pipe(
    map(([startHexColor, endHexColor, maxValue]: [string, string, number]) =>
      Array<string>(maxValue)
        .fill('')
        .map((_val: string, starIndex: number) =>
          findColorBetween(endHexColor, startHexColor, starIndex / (maxValue - 1 || 1)),
        ),
    ),
    shareReplay(1),
  );

  public colors$ = merge(this.colorsAutocomputeRange$, this.colorsInputRangeSubject).pipe(shareReplay(1));

  public constructor(private renderer: Renderer2) {}

  @Input()
  public canSpawnParticlesForRating = (rating: number) => rating === this.maxValueSubject.value;

  public onStarClicked(starIndex: number): void {
    this.animateToIndex(starIndex);
    this.ratingSubject.next(starIndex + 1);
  }

  private animateToIndex(starIndex: number): void {
    this.bounceAnimateToIndex(starIndex);

    if (!this.particlesDisabled) {
      console.log(starIndex + 1, this.maxValueSubject.value, this.canSpawnParticlesForRating(starIndex + 1));

      if (this.canSpawnParticlesForRating(starIndex + 1)) {
        console.log('yes');
        setTimeout(() => this.popParticlesAtIndex(starIndex), starIndex * this.delayPerStarMs);
      }
    }
  }

  private bounceAnimateToIndex(starIndex: number): void {
    if (!this.stars) {
      return;
    }

    const stars = this.stars.toArray().map((elemRef: ElementRef) => elemRef.nativeElement as HTMLElement);
    for (let i = 0; i <= starIndex; ++i) {
      const star = stars[i];
      this.renderer.removeClass(star, 'ngx-rating__star--animating');
      setTimeout(() => {
        this.renderer.addClass(star, 'ngx-rating__star--animating');
      }, 10);
    }
  }

  private popParticlesAtIndex(starIndex: number): void {
    if (!this.starContainers) {
      return;
    }

    const stars = this.starContainers.toArray().map((elemRef: ElementRef) => elemRef.nativeElement as HTMLElement);
    if (starIndex >= stars.length) {
      return;
    }

    const star = stars[starIndex];
    const yellowParticleStyle = { color: '#81c784' };
    const blueParticleStyle = { color: '#4fc3f7' };
    this.spawnParticle(star, 0, Math.SQRT2, yellowParticleStyle);
    this.spawnParticle(star, 1, 1, blueParticleStyle);
    this.spawnParticle(star, Math.SQRT2, 0, yellowParticleStyle);
    this.spawnParticle(star, 1, -1, blueParticleStyle);
    this.spawnParticle(star, 0, -Math.SQRT2, yellowParticleStyle);
    this.spawnParticle(star, -1, -1, blueParticleStyle);
    this.spawnParticle(star, -Math.SQRT2, 0, yellowParticleStyle);
    this.spawnParticle(star, -1, 1, blueParticleStyle);
  }

  private instantiateTemplate(template: TemplateRef<any>): EmbeddedViewRef<any> {
    console.log(template);
    return template.createEmbeddedView({});
  }

  private spawnParticle(
    parentElem: HTMLElement,
    x: number,
    y: number,
    cssStyle?: { [property: string]: string },
  ): void {
    if (!this.defaultParticle) {
      return;
    }

    const angle = Math.atan2(y, -x);

    const particle = this.renderer.createElement('div') as HTMLElement;
    const particleContent = this.renderer.createElement('div') as HTMLElement;
    const particleScalable = this.renderer.createElement('div') as HTMLElement;
    const instantiatedTemplate = this.instantiateTemplate(this.defaultParticle);
    // TODO ALL NODES
    const particleText = instantiatedTemplate.rootNodes[0];

    if (cssStyle) {
      Object.keys(cssStyle).forEach((cssProperty: string) => {
        const cssValue = cssStyle[cssProperty];
        this.renderer.setStyle(particleText, cssProperty, cssValue);
      });
    }
    this.renderer.addClass(particle, 'ngx-rating__star-container__particle');
    this.renderer.addClass(particleContent, 'ngx-rating__star-container__particle-content');
    this.renderer.addClass(particleScalable, 'ngx-rating__star-container__particle-scalable');

    this.renderer.setStyle(particleContent, 'transform', `scale(1)`);
    this.renderer.setStyle(particleScalable, 'transform', `rotate(${angle}rad`);

    setTimeout(() => {
      this.renderer.setStyle(
        particleContent,
        'transform',
        `${particleContent.style.transform} translate3d(${x * this.particlesDistanceEm}em, ${
          y * this.particlesDistanceEm
        }em, 0)`,
      );
      this.renderer.setStyle(particleScalable, 'transform', `${particleScalable.style.transform} scale(0)`);
    }, 20);

    this.renderer.appendChild(particleScalable, particleText);
    this.renderer.appendChild(particleContent, particleScalable);
    this.renderer.appendChild(particle, particleContent);
    this.renderer.appendChild(parentElem, particle);

    const unlistenEvent = this.renderer.listen(particleScalable, 'transitionend', () => {
      this.renderer.removeChild(parentElem, particle);
      instantiatedTemplate.destroy();
      unlistenEvent();
    });
  }

  public onMouseEnter(starIndex: number): void {
    this.hoveredStarIndexSubject.next(starIndex);
  }

  public onMouseLeave(_starIndex: number): void {
    this.hoveredStarIndexSubject.next(undefined);
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
