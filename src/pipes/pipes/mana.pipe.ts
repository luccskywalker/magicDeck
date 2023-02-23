import {
  Pipe,
  PipeTransform,
  ɵbypassSanitizationTrustHtml,
} from '@angular/core';
import { CardSymbol, Symbology } from 'scryfall-sdk';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'mana',
})
export class ManaPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public symbolsToReturn: string = '';
  public symbolsList: CardSymbol[] = [];

  public removeEmptyObjects(array: string[]) {
    return array.filter((obj) => Object.keys(obj).length !== 0);
  }

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    this.symbolsList = await Symbology.all();
    if (value) {
      let stringValues = value.split(/(\{.*?\})/);
      stringValues = this.removeEmptyObjects(stringValues);
      stringValues.forEach((element) => {
        this.symbolsList.filter((symbol) => {
          if (symbol.symbol == element) {
            this.symbolsToReturn =
              this.symbolsToReturn +
              '<span> <img style="width: 40px; height:40px" src="' +
              symbol.svg_uri +
              '"/> </span>';
          }
          return;
        });
      });
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.symbolsToReturn);
  }
}
