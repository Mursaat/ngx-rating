import { NgxRatingModule } from 'ngx-rating';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSidebarModule, NbThemeModule } from '@nebular/theme';

const NEBULAR_MODULES_WITH_PROVIDERS: any[] = [
  NbThemeModule.forRoot({ name: 'default' }),
  NbSidebarModule.forRoot(),
  NbEvaIconsModule,
];

@NgModule({
  imports: [BrowserAnimationsModule, ...NEBULAR_MODULES_WITH_PROVIDERS, NgxRatingModule.forRoot()],
})
export class CoreModule {
  public constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}
