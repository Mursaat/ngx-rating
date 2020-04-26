import {
    ChangeDetectionStrategy, Component, Directive, HostBinding, ViewEncapsulation
} from '@angular/core';

@Directive({ selector: 'app-toolbar-left' })
export class ToolbarLeftDirective {
  @HostBinding('class.app-toolbar-left')
  public hasBoundClass = true;
}

@Directive({ selector: 'app-toolbar-right' })
export class ToolbarRightDirective {
  @HostBinding('class.app-toolbar-right')
  public hasBoundClass = true;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @HostBinding('class.app-toolbar')
  public hasBoundClass = true;
}
