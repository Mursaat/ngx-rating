import { NgxRatingModule } from 'ngx-rating';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSidebarModule,
    NbToggleModule
} from '@nebular/theme';

const NEBULAR_MODULES: any[] = [
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbIconModule,
  NbToggleModule,
  NbInputModule,
  NbCardModule,
];

@NgModule({
  exports: [
    // Angular shared modules
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    // Libraries
    ...NEBULAR_MODULES,
    NgxRatingModule,
  ],
  providers: [],
})
export class SharedModule {}
