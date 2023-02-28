import { Component, OnInit } from '@angular/core';
import { Card } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

export interface Deck {
  name: string;
  cards: Card[];
}

@Component({
  selector: 'app-user-deck',
  templateUrl: './user-deck.component.html',
  styleUrls: ['./user-deck.component.less'],
})
export class UserDeckComponent implements OnInit {
  public deck!: Deck;
  constructor(private magicService: MagicServiceService) {}

  public userFavouriteCards: Card[] = [];

  public addToLibrary(cardsParams: Card) {
    this.userFavouriteCards.push(cardsParams);
  }

  public async populateFavCards() {
    this.magicService.getFavouriteCards().subscribe((data: Card[]) => {
      data.map((results) => {
        this.addToLibrary(results);
      });
    });
  }

  ngOnInit() {
    this.populateFavCards();
  }
}
