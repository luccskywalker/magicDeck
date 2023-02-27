import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card, Rarity } from 'scryfall-sdk';
import { ImageConfig } from '../card-image/card-image.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.less'],
})
export class CardModalComponent implements OnInit {
  @Input() card!: Card;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  public imageConfig!: ImageConfig;

  constructor() {}
  public closeModal() {
    this.emitClose.emit(null);
  }

  ngOnInit() {
    this.imageConfig = {
      img: this.card.image_uris?.normal,
      rarity: this.card.rarity,
    };
  }
}
