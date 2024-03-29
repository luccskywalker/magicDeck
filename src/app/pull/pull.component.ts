import { Component, OnInit, NgZone } from '@angular/core';
import * as Scry from 'scryfall-sdk';
import { Card } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

const DAILY_COUNTER = 5;
@Component({
  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.less'],
})
export class PullComponent implements OnInit {
  public randomNumber = 0;

  public countdown!: string;

  public loading = false;

  public saveButton = false;

  public shareButton = false;

  public showShare = false;

  public showCards = false;

  public rollsCounter = DAILY_COUNTER;

  public cardList!: Card[];

  public randomCard!: Card;

  public testCard!: Card;

  public pulledToday = false;

  public myInput!: number[];

  constructor(
    private magicService: MagicServiceService,
    private ngZone: NgZone
  ) {}

  public getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  public updateRollCounter(counter: number) {
    this.rollsCounter = counter;
  }

  public toggleShare() {
    this.showShare = !this.showShare;
  }
  public async roll() {
    this.cardList = await this.getRandomCards();
    this.showCards = true;
    this.saveButton = true;
    this.magicService.savePullTime();
    this.magicService.saveTodayPull(this.cardList);
    this.checkAlreadyPulled();
    this.loading = false;
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

  public timer() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setInterval(() => {
      this.ngZone.run(() => {
        let now = new Date().getTime();
        let distance = tomorrow.getTime() - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.countdown =
          days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
      });
    }, 1000);
  }

  public removeDuplicates(array: Card[]) {
    return [...new Set(array)];
  }

  public async populateTodayPull() {
    this.magicService.getTodayPull().subscribe((data: Card[]) => {
      this.cardList = data;
    });
  }

  public async eraseTodayPull() {
    this.magicService.clearTodayPull();
  }

  ngOnInit() {
    this.timer();
    this.checkAlreadyPulled();
    this.pulledToday ? this.populateTodayPull() : this.eraseTodayPull();
  }
}
