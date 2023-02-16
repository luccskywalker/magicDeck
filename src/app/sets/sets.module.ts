import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetsComponent } from './sets.component';
import { CardModule } from '../card/card.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CardModule, FormsModule],
  exports: [SetsComponent],
  declarations: [SetsComponent],
})
export class SetsModule {}
