import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { ManaPipe } from './mana.pipe';
import { Rarity } from './rarity.pipe';
import { Color } from './color.pipe';

@NgModule({
  exports: [PipesComponent, ManaPipe, Rarity, Color],
  imports: [CommonModule],
  declarations: [PipesComponent, ManaPipe, Rarity, Color],
})
export class PipesModule {}
