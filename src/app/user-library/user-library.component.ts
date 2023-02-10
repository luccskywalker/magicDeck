import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Card, Set, Sets } from 'scryfall-sdk';
import { MagicServiceService } from '../magicService/magicService.service';

interface UserLibrary {
  cards: Card[];
}
@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.less'],
})
export class UserLibraryComponent implements OnInit {
  constructor(private magicService: MagicServiceService) {}
  public userLibrary!: UserLibrary;

  public addToLibrary(cardsParams: Card[]) {
    this.userLibrary.cards = cardsParams;
  }
  public async populateLibrary() {
    const teste = this.magicService.getCardsFromLibrary().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.userLibrary = teste as unknown as UserLibrary;
    setTimeout(() => {
      console.log('A:', this.userLibrary);

      console.log('Teste', teste);
    }, 2000);
  }

  ngOnInit() {
    this.populateLibrary();
  }
}
