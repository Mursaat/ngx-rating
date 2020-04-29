import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppExamplesModule } from '../../assets/examples/examples.module';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [DemoComponent, ExampleComponent],
  imports: [SharedModule, DemoRoutingModule, AppExamplesModule],
})
export class DemoModule {}
