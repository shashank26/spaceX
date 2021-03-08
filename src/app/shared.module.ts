import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoxComponent } from './common/box/box.component';

@NgModule({
  declarations: [
    BoxComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BoxComponent,
    CommonModule
  ],
})
export class SharedModule { }
