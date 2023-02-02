import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { Card } from 'scryfall-sdk';
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
  public isHolo = false;
  constructor() {}

  public reveal() {
    this.img = this.card.image_uris?.normal;
  }
  ngOnInit() {
    this.isHolo = this.card.rarity === 'rare';
    this.img = DEFAULT_CARD_BACK;
  }
}
