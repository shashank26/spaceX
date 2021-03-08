import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoxComponent } from '../common/box/box.component';
import { SharedModule } from '../shared.module';
import { LaunchProgramRoutingModule } from './launch-program-routing.module';
import { LaunchProgramComponent } from './launch-program.component';
import { LaunchProgramItemComponent } from './launch-program-item/launch-program-item.component';
import { RocketImageComponent } from './launch-program-item/rocket-image/rocket-image.component';
import { LaunchInfoComponent } from './launch-program-item/launch-info/launch-info.component';
import { ScrollViewerDirective } from './scroll-viewer.directive';

@NgModule({
  declarations: [
    LaunchProgramComponent,
    LaunchProgramItemComponent,
    RocketImageComponent,
    LaunchInfoComponent,
    ScrollViewerDirective,
  ],
  imports: [
    LaunchProgramRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class LaunchProgramModule { }
