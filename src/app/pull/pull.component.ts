import { Component, OnInit } from '@angular/core';
import * as Scry from 'scryfall-sdk';
import { Card } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

const DAILY_COUNTER = 10;
@Component({
  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.less'],
})
export class PullComponent implements OnInit {
  public randomNumber = 0;

  public loading = false;

  public saveButton = false;

  public showCards = false;

  public rollsCounter = DAILY_COUNTER;

  public cardList!: Card[];

  public randomCard!: Card;

  public testCard!: Card;

  public pulledToday = false;

  public myInput!: number[];

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
    this.showCards = true;
    this.saveButton = true;
    this.magicService.savePullTime();
    this.magicService.saveTodayPull(this.cardList);
  }

  public generateRandom(number: number) {
    this.randomNumber = this.getRandom(number);
  }

  public saveToLibrary(cards: Card[]) {
    this.saveButton = false;
    cards = this.removeDuplicates(cards);
    this.magicService.saveCardsToLibrary(cards);
  }

  public checkAlreadyPulled() {
    const pullDate = this.magicService.getPullTime();
    const actualDate = new Date().toDateString();
    this.pulledToday = pullDate === actualDate;
  }

  public async getRandomCards() {
    this.loading = true;
    this.showCards = false;
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

  public async populateTodayPull() {
    this.magicService.getTodayPull().subscribe((data: Card[]) => {
      this.cardList = data;
    });
  }

  ngOnInit() {
    this.checkAlreadyPulled();
    if (this.pulledToday) {
      this.populateTodayPull();
    }
  }
}
