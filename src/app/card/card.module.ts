import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardModalModule } from '../card-modal/card-modal.module';
import { CardImageModule } from '../card-image/card-image.module';

@NgModule({
  imports: [CommonModule, CardModalModule, CardImageModule],
  exports: [CardComponent],
  declarations: [CardComponent],
})
export class CardModule {}
