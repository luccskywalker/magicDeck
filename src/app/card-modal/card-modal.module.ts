import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [CommonModule],
  declarations: [CardModalComponent],
  exports: [CardModalComponent],
})
export class CardModalModule {}
