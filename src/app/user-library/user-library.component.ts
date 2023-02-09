import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Card, Set, Sets } from 'scryfall-sdk';

interface UserLibrary {
  cards: Card[];
}
@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.less'],
})
export class UserLibraryComponent implements OnInit {
  constructor() {}
  public loading = false;
  public userLibrary!: UserLibrary;
  public setsList!: Set[];

  public addToLibrary(card: Card) {
    this.userLibrary.cards.push(card);
  }
  public async getSets() {
    this.loading = true;
    this.setsList = await Promise.all(await Sets.all());
    this.loading = false;
    return this.setsList;
  }
  ngOnInit() {}
}
