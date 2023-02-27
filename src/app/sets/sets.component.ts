import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { format } from 'path';
import { Sets, Set, Card, Cards, setFuzzySearch } from 'scryfall-sdk';

const FIRST_YEAR_RELEASE = new Date('1993-01-20');
const LAST_YEAR_RELEASE = new Date('2023-01-20');

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.less'],
})
export class SetsComponent implements OnInit {
  public loading = false;
  public showSetCardList = false;
  public cardsList: Card[] = [];
  public yearTitle = new Date();
  public setsList!: Set[];
  public optionValues: Date[] = [];
  public currentSearchYear = FIRST_YEAR_RELEASE;

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
  public increaseYear() {}
  public decreaseYear() {}

  public searchBySpecificYear(year: any) {
    this.closeCardContainer();
    this.getSetsByYear(new Date(year));
  }
  public closeCardContainer() {
    this.showSetCardList = false;
  }

  public async getSetsByYear(year: Date) {
    this.setsList = [];
    this.cardsList = [];
    this.loading = true;
    // TENHO QUE IMPLEMENTAR A BUSCA PELO SDK
    this.setsList = await this.getAllSets();
    // POIS ESTOU BUSCANDO TODOS OS SETS PARA DEPOIS FILTRÁ-LOS
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
    let iteratorDate = new Date(firstDate);
    while (iteratorDate < secondDate) {
      this.optionValues.push(new Date(iteratorDate));
      iteratorDate.setFullYear(iteratorDate.getFullYear() + 1);
    }
  }

  ngOnInit() {
    this.getSetsByYear(FIRST_YEAR_RELEASE);
    this.fillDatesArray(FIRST_YEAR_RELEASE, LAST_YEAR_RELEASE);
  }
}
