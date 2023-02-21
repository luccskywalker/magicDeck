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

  public imageSymbol!: CardSymbol;

  transform(value: any, event?: any): SafeHtml {
    let termsApply =
      '<span> <img style="height: 50px;width: 50px" src="https://svgs.scryfall.io/card-symbols/7.svg"> </span>';

    return this._sanitizer.bypassSecurityTrustHtml(termsApply);
  }
}
