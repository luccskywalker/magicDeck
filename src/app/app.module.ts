import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PullModule } from './pull/pull.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PullModule],
  providers: [AppModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
