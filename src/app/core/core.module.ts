import { NgxRatingModule } from 'ngx-rating';

import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconService } from './icon/icon.service';

@NgModule({
  imports: [BrowserAnimationsModule, HttpClientModule, NgxRatingModule.forRoot()],
})
export class CoreModule {
  public constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    iconService: IconService,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }

    iconService.registerSvgIcons();
  }
}
