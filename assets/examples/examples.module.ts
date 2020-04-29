import { NgxRatingModule } from 'ngx-rating';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Example1Component } from './1/example.component';
import { Example2Component } from './2/example.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxRatingModule],
  declarations: [Example1Component, Example2Component],
  exports: [Example1Component, Example2Component],
})
export class AppExamplesModule {}
