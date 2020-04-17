import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full',
  },
  // TODO : 404 Page ?
  {
    path: '**',
    redirectTo: 'demo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
