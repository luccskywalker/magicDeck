import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { format } from 'path';
import { Sets, Set, Card, Cards, setFuzzySearch } from 'scryfall-sdk';

const FIRST_YEAR_RELEASE = new Date('1993-01-20');
const LAST_YEAR_RELEASE = new Date('2023-10-20');

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.less'],
})
export class SetsComponent implements OnInit {
  public labelYear = LAST_YEAR_RELEASE;
  public loading = false;
  public showSetCardList = false;
  public cardsList: Card[] = [];
  public yearTitle = new Date();
  public setsList!: Set[];
  public optionValues: Date[] = [];
  public currentSearchYear = FIRST_YEAR_RELEASE;
  public sort!: 'rarity' | 'released_at';
  public order!: string;

  constructor() {}

  public async showSetCards(set: Set) {
    this.cardsList = [];
    await Cards.search('set:' + set.code).map((data: Card) => {
      this.cardsList.push(data);
    });
    this.showSetCardList = true;
    return await Promise.all(this.cardsList);
  }
  public getOptionValue(event: any) {
    this.currentSearchYear = new Date(event);
  }

  public searchBySpecificYear(year: any) {
    this.closeCardContainer();
    this.getSetsByYear(new Date(year));
    this.labelYear = year;
  }
  public closeCardContainer() {
    this.showSetCardList = false;
  }

  public async getSetsByYear(year: Date) {
    this.setsList = [];
    this.cardsList = [];
    this.loading = true;
    this.setsList = await this.getAllSets();
    this.setsList = await this.setsList.filter((Set) => {
      this.yearTitle = year;
      if (Set.released_at) {
        const releasedDate = new Date(Set.released_at);
        if (releasedDate) {
          if (releasedDate.getFullYear() === this.yearTitle.getFullYear()) {
            return Set;
          }
        }
      }
      return;
    });
    this.loading = false;
  }

  public async getAllSets() {
    this.setsList = await Promise.all(await Sets.all());
    return this.setsList;
  }

  public fillDatesArray(firstDate: Date, secondDate: Date) {
    let iteratorDate = new Date(secondDate);
    while (iteratorDate > firstDate) {
      this.optionValues.push(new Date(iteratorDate));
      iteratorDate.setFullYear(iteratorDate.getFullYear() - 1);
    }
  }

  public sortDesc(property: 'rarity' | 'released_at') {
    this.cardsList.sort((a: Card, b: Card) => {
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
    this.cardsList.sort((a: Card, b: Card) => {
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
    this.getSetsByYear(LAST_YEAR_RELEASE);
    this.fillDatesArray(FIRST_YEAR_RELEASE, LAST_YEAR_RELEASE);
  }
}
