import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';
import { CardModule } from '../card/card.module';
import { CardImageModule } from '../card-image/card-image.module';

@NgModule({
  imports: [CommonModule, CardImageModule],
  declarations: [CardModalComponent],
  exports: [CardModalComponent],
})
export class CardModalModule {}
