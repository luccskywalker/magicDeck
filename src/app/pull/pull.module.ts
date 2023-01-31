import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PullComponent } from './pull.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [PullComponent],
  providers: [PullComponent],
  exports: [PullComponent],
})
export class PullModule {}
