import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarComponent, ToolbarLeftDirective, ToolbarRightDirective } from './toolbar.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [ToolbarComponent, ToolbarLeftDirective, ToolbarRightDirective],
  exports: [ToolbarComponent, ToolbarLeftDirective, ToolbarRightDirective],
})
export class ToolbarModule {}
