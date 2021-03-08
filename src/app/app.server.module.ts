import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpServerInterceptor } from './http-interceptors/http-server.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpServerInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor() {
    
  }
}
