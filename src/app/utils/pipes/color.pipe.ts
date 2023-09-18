import {
  Pipe,
  PipeTransform,
  ɵbypassSanitizationTrustHtml,
} from '@angular/core';
import { CardSymbol, Symbology } from 'scryfall-sdk';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'color',
})
export class Color implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public symbolsToReturn: string = '';
  public symbolsList!: string;

  public getColor(value: string) {
    const colors: { [x: string]: string } = {
      R: '🔴',
      G: '🟢',
      U: '🔵',
      W: '⚪',
      B: '⚫',
      0: '0️⃣',
      1: '1️⃣',
      2: '2️⃣',
      3: '3️⃣',
      4: '4️⃣',
      5: '5️⃣',
      6: '6️⃣',
      7: '7️⃣',
      8: '8️⃣',
      9: '9️⃣',
    };
    return colors[value];
  }

  async transform(
    value: string | null | undefined,
    event?: any
  ): Promise<SafeHtml> {
    if (value) {
      this.symbolsToReturn = this.getColor(value);
      console.log('Value:', value);
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.symbolsToReturn);
  }
}
