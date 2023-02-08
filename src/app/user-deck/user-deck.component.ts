import { Component, OnInit } from '@angular/core';
import { Card } from 'scryfall-sdk';

interface Deck {
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
  constructor() {}

  ngOnInit() {}
}
