import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PullComponent } from './pull.component';
import { CardModule } from '../card/card.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ShareModule,
    HttpClientModule,
  ],
  declarations: [PullComponent],
  providers: [PullComponent],
  exports: [PullComponent],
})
export class PullModule {}
