import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterTemplateComponent } from './filter/filter-template/filter-template.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { HttpClientInterceptor } from './http-interceptors/http-client.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterTemplateComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
