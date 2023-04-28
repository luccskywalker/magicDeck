import {
  Pipe,
  PipeTransform,
  ɵbypassSanitizationTrustHtml,
} from '@angular/core';
import { CardSymbol, Symbology } from 'scryfall-sdk';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'type',
})
export class Types implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public symbolsToReturn: string = '';
  public symbolsList: CardSymbol[] = [];

  public removeEmptyObjects(array: string[]) {
    return array.filter((obj) => Object.keys(obj).length !== 0);
  }

  public getTypes(value: string) {
    const types: { [x: string]: string } = {
      '`—`': '',
      '//': '',
      ' ': '',
      Artifact: '🔧',
      Enchantment: '📜',
      Creature: '👤',
      Planeswalker: '🌎',
      Instant: '⌚',
      Zombie: '🧟',
      Soldier: '💂',
      Legendary: '✨',
      Equipment: '🥽',
      Snow: '❄',
      Token: '😶',
      God: '🕊',
      Tentacle: '🦑',
      Sorcery: '🎇',
      Bird: '🦜',
      Human: '🧑',
      Druid: '🧙‍♀️',
    };
    return types[value];
  }

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    if (value) {
      let stringValues = value.split(/\b/g);
      stringValues = this.removeEmptyObjects(stringValues);
      stringValues.forEach((element) => {
        console.log(element);
        if (element !== ' — ') {
          this.symbolsToReturn =
            this.symbolsToReturn + ' ' + this.getTypes(element) + ' ';
        }
      });
    }

    return this._sanitizer.bypassSecurityTrustHtml(this.symbolsToReturn);
  }
}
