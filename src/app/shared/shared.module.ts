import { NgxRatingModule } from 'ngx-rating';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { CodeSectionModule } from './code-section/code-section.module';
import { LayoutModule } from './layout/layout.module';
import { ToolbarModule } from './toolbar/toolbar.module';

const MAT_MODULES: any[] = [MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule];

@NgModule({
  exports: [
    // Angular shared modules
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    // Libraries
    ...MAT_MODULES,
    NgxRatingModule,

    // App shared modules
    LayoutModule,
    ToolbarModule,
    CodeSectionModule,
  ],
  providers: [],
})
export class SharedModule {}
