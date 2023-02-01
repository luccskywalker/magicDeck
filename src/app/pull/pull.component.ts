import { Component, OnInit } from '@angular/core';
import { promises } from 'dns';
import * as Scry from 'scryfall-sdk';
import { Card } from 'scryfall-sdk';

@Component({
  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.less'],
})
export class PullComponent implements OnInit {
  public randomNumber = 0;

  public loading = false;

  public rollsCounter = 0;

  public cardList!: Scry.Card[];

  public randomCard!: Scry.Card;

  public testCard!: Card;

  constructor() {}

  public getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  public updateRollCounter(counter: number) {
    this.rollsCounter = counter;
  }

  public async roll() {
    let testArray: any[];
    this.loading = true;
    testArray = await this.getRandomCard2();
    setTimeout(() => {
      this.loading = false;
      this.cardList = testArray;
    }, 5000);
  }

  public generateRandom(number: number) {
    this.randomNumber = this.getRandom(number);
  }

  public getCard(id: number) {}

  public async getRandomCard2() {
    const cardArray = [];
    for (let i = 0; i < this.rollsCounter; i++) {
      const card = await Scry.Cards.random();
      cardArray.push(card);
    }
    return await Promise.all(cardArray);
  }

  public async getRandomCard() {
    this.randomCard = await Scry.Cards.random();
    return this.randomCard;
  }

  ngOnInit() {}
}
