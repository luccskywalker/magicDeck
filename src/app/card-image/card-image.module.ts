import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImageComponent } from './card-image.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [CommonModule, LazyLoadImageModule],
  declarations: [CardImageComponent],
  exports: [CardImageComponent],
})
export class CardImageModule {}
