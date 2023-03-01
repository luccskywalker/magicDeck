import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { Card, Rarity } from 'scryfall-sdk';
import { ImageConfig } from '../card-image/card-image.component';
const DEFAULT_CARD_BACK =
  'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg';
const BLANK_CARD =
  'https://cards.scryfall.io/large/front/8/d/8d7f421e-6947-4509-a179-8522fa4a29f8.jpg';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() revealed = false;
  public img!: string | undefined;

  public showModal = false;
  public imageConfig!: ImageConfig;
  constructor() {}

  public reveal() {
    if (!this.card.image_uris) {
      this.imageConfig.img = BLANK_CARD;
      return;
    }
    this.imageConfig.img = this.card.image_uris?.normal;
  }

  public showBackCard() {
    this.img = DEFAULT_CARD_BACK;
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
  public defaultBackFrame() {
    if (this.card.image_uris?.normal) {
      return DEFAULT_CARD_BACK;
    }
    return BLANK_CARD;
  }

  ngOnInit() {
    this.imageConfig = {
      img: this.defaultBackFrame(),
      rarity: this.card.rarity,
    };
    this.revealed ? this.reveal() : this.showBackCard();
  }
}
