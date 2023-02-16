import { Component, OnInit } from '@angular/core';
import { format } from 'path';
import { Sets, Set, Card, Cards, setFuzzySearch } from 'scryfall-sdk';

const FIRST_YEAR_RELEASE = '1993';
const LAST_YEAR_RELEASE = '2022';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.less'],
})
export class SetsComponent implements OnInit {
  public loading = false;
  public showSetCardList = false;
  public cardsList: Card[] = [];
  public yearTitle = '----';
  public setsList!: Set[];
  public optionValue = FIRST_YEAR_RELEASE;

  constructor() {}

  public async showSetCards(set: Set) {
    await Cards.search('set:' + set.code).map((data: Card) => {
      this.cardsList.push(data);
    });
    this.showSetCardList = true;
    return await Promise.all(this.cardsList);
  }
  public getOptionValue() {
    console.log('Value: ', this.optionValue);
  }
  public increaseYear() {}
  public decreaseYear() {}

  public searchBySpecificYear(year: String) {
    this.closeCardContainer();
    this.getSetsByYear(year);
  }
  public closeCardContainer() {
    this.showSetCardList = false;
  }

  public async getSetsByYear(year: String) {
    this.loading = true;
    // TENHO QUE IMPLEMENTAR A BUSCA PELO SDK
    this.setsList = await this.getAllSets();
    // POIS ESTOU BUSCANDO TODOS OS SETS PARA DEPOIS FILTRÁ-LOS
    this.setsList = await this.setsList.filter((Set) => {
      const yearSplitted = year.split('-');
      this.yearTitle = yearSplitted[0];
      const dateSplitted = Set.released_at?.split('-');
      if (dateSplitted) {
        if (dateSplitted[0] === yearSplitted[0]) {
          return Set;
        }
      }
      return;
    });
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  public async getAllSets() {
    this.setsList = await Promise.all(await Sets.all());
    return this.setsList;
  }

  onChange(eventValue: any) {
    console.log(eventValue);
  }
  ngOnInit() {
    this.getSetsByYear(FIRST_YEAR_RELEASE);
  }
}
