import { BehaviorSubject } from 'rxjs';

import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

const LIGHT_THEME = 'default';
const DARK_THEME = 'dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class.app-root')
  public hasBoundClass = true;

  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.themeService.currentTheme === DARK_THEME);
  public isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  public constructor(private themeService: NbThemeService) {}

  public onThemeToggled(isDark: boolean): void {
    this.themeService.changeTheme(isDark ? DARK_THEME : LIGHT_THEME);
    this.isDarkThemeSubject.next(isDark);
  }
}
