import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';
import { CardModule } from '../card/card.module';
import { CardImageModule } from '../card-image/card-image.module';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { ManaPipe } from 'src/app/utils/pipes/mana.pipe';

@NgModule({
  imports: [CommonModule, CardImageModule, PipesModule],
  declarations: [CardModalComponent],
  exports: [CardModalComponent],
})
export class CardModalModule {}
