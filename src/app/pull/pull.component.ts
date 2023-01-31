import { Component, OnInit } from '@angular/core';
import { Card, CardFilter } from 'mtgsdk-ts';
import * as Scry from 'scryfall-sdk';

@Component({
  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.less'],
})
export class PullComponent implements OnInit {
  public randomNumber = 0;

  public loading = false;

  public randomCard!: Scry.Card;
  public testCard!: Card;

  constructor() {}

  public getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  public generateRandom(number: number) {
    this.randomNumber = this.getRandom(number);
  }

  public getCard(id: number) {}

  public async getRandomCard() {
    this.loading = true;
    const card = await Scry.Cards.random();
    this.randomCard = card;
    this.loading = false;
    console.log('Random Card', this.randomCard);
  }

  ngOnInit() {}
}
