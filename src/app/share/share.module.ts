import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';
import { ManaPipe } from '../utils/pipes/mana.pipe';
import { PipesModule } from '../utils/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [ShareComponent],
  exports: [ShareComponent],
})
export class ShareModule {}
