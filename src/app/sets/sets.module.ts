import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsComponent } from './sets.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [CommonModule, CardModule],
  exports: [SetsComponent],
  declarations: [SetsComponent],
})
export class SetsModule {}
