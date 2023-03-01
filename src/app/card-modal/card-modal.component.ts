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
  public alreadyHave = false;
  public saveToLibrary: Card[] = [];

  public favouriteCard(card: Card) {
    this.checkAlreadyHave();
    console.log('Already?', this.alreadyHave);

    if (this.alreadyHave) {
      console.log('Entrei');

      this.magicService.favouriteCard(card);
      return;
    }
    console.log('Não entrei');
    this.saveToLibrary.push(card);
    this.magicService.saveCardsToLibrary(this.saveToLibrary);
    this.magicService.favouriteCard(card);
  }
  public checkAlreadyHave() {
    this.magicService.checkAlreadyHaveCard(this.card).subscribe((card) => {
      if (card.length) {
        this.alreadyHave = true;
        return;
      }
      this.alreadyHave = false;
    });
  }

  public unfavouriteCard() {}

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
