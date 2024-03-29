import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library.component';
import { CardModule } from '../card/card.module';
import { SetsModule } from '../sets/sets.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CardModule, SetsModule, FormsModule],
  declarations: [UserLibraryComponent],
  providers: [UserLibraryComponent],
  exports: [UserLibraryComponent],
})
export class UserLibraryModule {}
