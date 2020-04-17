import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

export const ROUTES: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
