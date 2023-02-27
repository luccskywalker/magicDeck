import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeckComponent } from './user-deck.component';
import { CardModule } from '../card/card.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [UserDeckComponent],
  exports: [UserDeckComponent],
  providers: [UserDeckComponent],
})
export class UserDeckModule {}
