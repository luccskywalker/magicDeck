import { Component, Input, OnInit } from '@angular/core';
import { Rarity } from 'scryfall-sdk';

enum CustomRarity {
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  Special = 'special',
  Mythic = 'mythic',
  Bonus = 'bonus',
}

export interface ImageConfig {
  img: string | undefined;
  rarity: Rarity;
}

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.less'],
})
export class CardImageComponent implements OnInit {
  @Input() config!: ImageConfig;
  public classTemplate: Rarity = Rarity.common;
  constructor() {}

  ngOnInit() {
    this.classTemplate = this.config.rarity;
  }
}
