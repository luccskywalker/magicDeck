import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Card, Set, Sets } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

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

  ngOnInit() {
    this.populateLibrary();
  }
}
