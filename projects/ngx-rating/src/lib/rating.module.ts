import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxRatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxRatingComponent],
  exports: [NgxRatingComponent],
})
export class NgxRatingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxRatingModule,
      providers: [],
    };
  }
}
