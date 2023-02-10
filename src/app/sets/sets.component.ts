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

  constructor() {}

  public async showSetCards(set: Set) {
    const cardsList = await Cards.search('set:' + set.code).map(
      (data: Card) => {
        this.cardsList.push(data);
      }
    );
    this.showSetCardList = true;
    return await Promise.all(this.cardsList);
  }

  public async getSetsByYear(year: String) {
    this.loading = true;
    this.setsList = await this.getAllSets();
    this.setsList = this.setsList.filter((Set) => {
      const yearSplitted = year.split('-');
      this.yearTitle = yearSplitted[0];
      const dateSplitted = Set.released_at?.split('-');
      if (dateSplitted) {
        if (dateSplitted[0] > yearSplitted[0]) {
          this.loading = false;
          return Set;
        }
      }
      this.loading = false;

      return;
    });
  }

  public async getAllSets() {
    this.setsList = await Promise.all(await Sets.all());
    return this.setsList;
  }

  ngOnInit() {}
}
