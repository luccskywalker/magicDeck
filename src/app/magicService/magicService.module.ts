import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicServiceComponent } from './magicService.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [MagicServiceComponent],
  declarations: [MagicServiceComponent],
})
export class MagicServiceModule {}
