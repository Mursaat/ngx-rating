import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { LayoutComponent, LayoutContentDirective } from './layout.component';

@NgModule({
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  declarations: [LayoutComponent, LayoutContentDirective],
  exports: [LayoutComponent, LayoutContentDirective],
})
export class LayoutModule {}
