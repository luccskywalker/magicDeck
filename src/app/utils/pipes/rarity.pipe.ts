import {
  Pipe,
  PipeTransform,
  ɵbypassSanitizationTrustHtml,
} from '@angular/core';
import { CardSymbol, Symbology } from 'scryfall-sdk';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'rarity',
})
export class Rarity implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public symbolsToReturn: string = '';
  public symbolsList!: string;

  public getIcons(value: string) {
    const icons: { [x: string]: string } = {
      common: '🟫',
      uncommon: '⬜',
      rare: '🟨',
      mythic: '🟥',
      Common: '🟫',
      Uncommon: '⬜',
      Rare: '🟨',
      Mythic: '🟥',
    };
    return icons[value];
  }

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    if (value) {
      this.symbolsToReturn = this.getIcons(value);
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.symbolsToReturn);
  }
}
