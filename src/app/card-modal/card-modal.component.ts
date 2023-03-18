import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs';
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
  public isFavourite = false;
  public loading = false;
  public saveToLibrary: Card[] = [];

  constructor(private magicService: MagicServiceService) {}

  public checkFavourite(card: Card) {
    this.isFavourite = this.magicService.checkAlreadyFavourited(card);

    if (this.isFavourite) {
      this.unfavouriteCard(card);
      return;
    }
    this.favouriteCard(card);

    // json-implementation
    // this.magicService
    //   .checkAlreadyFavourited(card)
    //   .pipe(
    //     take(1),
    //     finalize(() => {
    //       if (this.isFavourite) {
    //         this.unfavouriteCard(card);
    //         this.loading = false;
    //         return;
    //       }
    //       this.favouriteCard(card);
    //       this.loading = false;
    //     })
    //   )
    //   .subscribe((card) => {
    //     if (card.length) {
    //       this.isFavourite = true;
    //       return;
    //     }
    //     this.isFavourite = false;
    //   });
  }
  public unfavouriteCard(card: Card) {
    this.magicService.unfavouriteCard(card);
    this.loading = false;
  }
  public favouriteCard(card: Card) {
    this.magicService.favouriteCard(card);
    this.loading = false;
  }

  public toggleFavourite(card: Card) {
    this.loading = true;
    this.alreadyHave = this.magicService.checkAlreadyHaveCard(this.card);
    if (this.alreadyHave) {
      this.checkFavourite(card);
      return;
    }
    this.saveToLibrary.push(card);
    this.magicService.saveCardsToLibrary(this.saveToLibrary);
    this.checkFavourite(card);

    // json-server implementation
    // this.magicService
    //   .checkAlreadyHaveCard(this.card)
    //   .pipe(
    //     take(1),
    //     finalize(() => {
    //       if (this.alreadyHave) {
    //         this.checkFavourite(card);
    //         return;
    //       }
    //       this.saveToLibrary.push(card);
    //       this.magicService.saveCardsToLibrary(this.saveToLibrary);
    //       this.checkFavourite(card);
    //     })
    //   )
    //   .subscribe((card) => {
    //     if (card.length) {
    //       this.alreadyHave = true;
    //       return;
    //     }
    //     this.alreadyHave = false;
    //   });
  }

  public async checkAlreadyHave() {
    this.alreadyHave = this.magicService.checkAlreadyHaveCard(this.card);

    // json-server implementation
    // this.magicService
    //   .checkAlreadyHaveCard(this.card)
    //   .pipe(
    //     take(1),
    //     finalize(() => {})
    //   )
    //   .subscribe((card) => {
    //     if (card.length) {
    //       this.alreadyHave = true;
    //       return;
    //     }
    //     this.alreadyHave = false;
    //   });
  }

  public closeModal() {
    this.emitClose.emit(null);
  }

  public checkIsDoubleSided() {
    if (!this.card.image_uris) {
      this.imageConfig = {
        img: this.card.card_faces[1].image_uris?.normal,
        rarity: this.card.rarity,
      };
      return;
    }
    this.imageConfig = {
      img: this.card.image_uris?.normal,
      rarity: this.card.rarity,
    };
  }

  ngOnInit() {
    this.checkIsDoubleSided();
    this.isFavourite = this.magicService.checkAlreadyFavourited(this.card);

    //json-server implementation
    // this.magicService
    //   .checkAlreadyFavourited(this.card)
    //   .pipe(
    //     take(1),
    //     finalize(() => {})
    //   )
    //   .subscribe((card) => {
    //     if (card.length) {
    //       this.isFavourite = true;
    //       return;
    //     }
    //     this.isFavourite = false;
    //   });
  }
}
