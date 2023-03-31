import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { ManaPipe } from './mana.pipe';

@NgModule({
  exports: [PipesComponent, ManaPipe],
  imports: [CommonModule],
  declarations: [PipesComponent, ManaPipe],
})
export class PipesModule {}
