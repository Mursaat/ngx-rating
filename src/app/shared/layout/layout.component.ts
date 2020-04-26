import {
    ChangeDetectionStrategy, Component, Directive, HostBinding, ViewEncapsulation
} from '@angular/core';

@Directive({ selector: 'app-layout-content' })
export class LayoutContentDirective {
  @HostBinding('class.app-layout-content')
  public hasBoundClass = true;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @HostBinding('class.app-layout')
  public hasBoundClass = true;
}
