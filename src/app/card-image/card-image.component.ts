import { Component, Input, OnInit } from '@angular/core';
import { Rarity } from 'scryfall-sdk';

export interface ImageConfig {
  img: string | undefined;
  rarity: keyof typeof Rarity;
}

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.less'],
})
export class CardImageComponent implements OnInit {
  @Input() config!: ImageConfig;

  public isHolo = false;

  constructor() {}

  ngOnInit() {
    this.isHolo = this.config.rarity === Rarity[0];
  }
}
