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

  public imageSymbol!: string;

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    console.log('Valores: ', value);
    if (value) {
      const test = value.slice(3);
      console.log('Slice', test[1]);
    }

    const a: CardSymbol[] = await Symbology.all();

    a.filter((symbol) => {
      if (symbol.symbol == value) {
        this.imageSymbol =
          '<span> <img style="width= 10px; height=10px" src="' +
          symbol.svg_uri +
          '"/> </span>';
      }
      return;
    });
    setTimeout(() => {
      console.log('A ', this.imageSymbol);
    }, 2000);
    return this._sanitizer.bypassSecurityTrustHtml(this.imageSymbol);
  }
}
