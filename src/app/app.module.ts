import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DemoModule } from './demo/demo.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, SharedModule, AppRoutingModule, DemoModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
