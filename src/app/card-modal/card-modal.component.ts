import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card, Rarity } from 'scryfall-sdk';
import { ImageConfig } from '../card-image/card-image.component';
import { MagicServiceService } from '../magicService/magicService.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.less'],
})
export class CardModalComponent implements OnInit {
  @Input() card!: Card;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  public imageConfig!: ImageConfig;

  public favouriteCard(card: Card) {
    this.magicService.favouriteCard(card);
  }

  constructor(private magicService: MagicServiceService) {}

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
