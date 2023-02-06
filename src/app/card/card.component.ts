import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { Card, Rarity } from 'scryfall-sdk';
import { ImageConfig } from '../card-image/card-image.component';
const DEFAULT_CARD_BACK =
  'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  public img!: string | undefined;

  public showModal = false;
  public imageConfig!: ImageConfig;
  constructor() {}

  public reveal() {
    this.imageConfig.img = this.card.image_uris?.normal;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  public openModal() {
    this.toggleModal();
  }
  public closeModal() {
    this.toggleModal();
  }

  ngOnInit() {
    this.img = DEFAULT_CARD_BACK;
    this.imageConfig = {
      img: DEFAULT_CARD_BACK,
      rarity: this.card.rarity as unknown as Rarity,
    };
  }
}
