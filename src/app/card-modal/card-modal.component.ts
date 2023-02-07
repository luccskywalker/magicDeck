import { Component, Input, OnInit } from '@angular/core';
import { Card, Rarity } from 'scryfall-sdk';
import { ImageConfig } from '../card-image/card-image.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.less'],
})
export class CardModalComponent implements OnInit {
  @Input() card!: Card;
  public imageConfig!: ImageConfig;

  constructor() {}
  public closeModal() {}

  ngOnInit() {
    this.imageConfig = {
      img: this.card.image_uris?.normal,
      rarity: this.card.rarity as unknown as Rarity,
    };
  }
}
