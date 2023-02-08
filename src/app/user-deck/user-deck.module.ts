import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeckComponent } from './user-deck.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [UserDeckComponent],
  exports: [UserDeckModule],
})
export class UserDeckModule {}
