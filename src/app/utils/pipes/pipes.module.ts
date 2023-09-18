import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { ManaPipe } from './mana.pipe';
import { Rarity } from './rarity.pipe';
import { Color } from './color.pipe';
import { Types } from './types.pipe';

@NgModule({
  exports: [PipesComponent, ManaPipe, Rarity, Color, Types],
  imports: [CommonModule],
  declarations: [PipesComponent, ManaPipe, Rarity, Color, Types],
})
export class PipesModule {}
