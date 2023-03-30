import { Component, OnInit } from '@angular/core';
import * as Scry from 'scryfall-sdk';
import { Card } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

@Component({
  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.less'],
})
export class PullComponent implements OnInit {
  public randomNumber = 0;

  public loading = false;

  public saveButton = false;

  public rollsCounter = 0;

  public cardList!: Card[];

  public randomCard!: Card;

  public testCard!: Card;

  constructor(private magicService: MagicServiceService) {}

  public getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  public updateRollCounter(counter: number) {
    this.rollsCounter = counter;
  }

  public async roll() {
    this.cardList = await this.getRandomCards();
    this.loading = false;
    this.saveButton = true;
  }

  public generateRandom(number: number) {
    this.randomNumber = this.getRandom(number);
  }

  public saveToLibrary(cards: Card[]) {
    this.saveButton = false;
    cards = this.removeDuplicates(cards);
    this.magicService.saveCardsToLibrary(cards);
  }

  public getCard(id: number) {}

  public async getRandomCards() {
    this.loading = true;
    const cardArray = [];
    for (let i = 0; i < this.rollsCounter; i++) {
      const card = await this.getRandomCard();
      cardArray.push(card);
    }
    return await Promise.all(cardArray);
  }

  public async getRandomCard() {
    this.randomCard = await Scry.Cards.random();
    return this.randomCard;
  }

  public removeDuplicates(array: Card[]) {
    return [...new Set(array)];
  }

  ngOnInit() {}
}
