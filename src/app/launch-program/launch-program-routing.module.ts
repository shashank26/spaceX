import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LaunchProgramComponent } from './launch-program.component';

const routes: Routes = [{
  path: '', component: LaunchProgramComponent
}, {
  path: ':id', component: LaunchProgramComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class LaunchProgramRoutingModule { }
