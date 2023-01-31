import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PullComponent } from './pull.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PullComponent],
  providers: [PullComponent],
  exports: [PullComponent],
})
export class PullModule {}
