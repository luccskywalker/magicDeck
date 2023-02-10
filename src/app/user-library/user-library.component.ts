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
  public userLibrary!: UserLibrary;

  public addToLibrary(card: Card) {
    this.userLibrary.cards.push(card);
  }

  ngOnInit() {}
}
