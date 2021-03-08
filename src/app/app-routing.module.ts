import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [{
  path: '', redirectTo: 'launch-programs', pathMatch: 'full',
},
{
  path: 'launch-programs', loadChildren: () => import('./launch-program/launch-program.module').then(m => m.LaunchProgramModule),
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
