import { HighlightModule } from 'ngx-highlightjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodeSectionComponent } from './code-section.component';

@NgModule({
  imports: [CommonModule, HighlightModule, RouterModule],
  declarations: [CodeSectionComponent],
  exports: [CodeSectionComponent],
})
export class CodeSectionModule {}
