import {
    ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  @HostBinding('class.app-example')
  public hasBoundClass = true;

  @Input()
  public name: string | undefined;

  @Input()
  public id: number | undefined;
}
