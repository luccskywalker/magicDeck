import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Card, Rarity, Set, Sets } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

enum Sort {
  'rarity',
  'released_at',
}
interface UserLibrary {
  cards: Card[];
}

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.less'],
})
export class UserLibraryComponent implements OnInit {
  constructor(private magicService: MagicServiceService) {}
  public userLibrary: Card[] = [];

  public sort!: 'rarity' | 'released_at';

  public order!: string;

  public addToLibrary(cardsParams: Card) {
    this.userLibrary.push(cardsParams);
  }

  public async populateLibrary() {
    this.magicService.getCardsFromLibrary().subscribe((data: Card[]) => {
      data.map((results) => {
        this.addToLibrary(results);
      });
    });
  }

  public sortDesc(property: 'rarity' | 'released_at') {
    this.userLibrary.sort((a: Card, b: Card) => {
      if (a[property] <= b[property]) {
        return 1;
      }
      if (a[property] >= b[property]) {
        return -1;
      }
      return 0;
    });
  }

  public sortAsc(property: 'rarity' | 'released_at') {
    this.userLibrary.sort((a: Card, b: Card) => {
      if (a[property] >= b[property]) {
        return 1;
      }
      if (a[property] <= b[property]) {
        return -1;
      }
      return 0;
    });
  }

  public sortBy(sort: string, attr: 'rarity' | 'released_at') {
    if (sort === 'asc') {
      this.sortAsc(attr);
      return;
    }
    this.sortDesc(attr);
  }

  ngOnInit() {
    this.populateLibrary();
  }
}
