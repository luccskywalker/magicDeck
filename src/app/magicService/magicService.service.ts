import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from 'scryfall-sdk';
import { removeDuplicates } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class MagicServiceService {
  constructor(private httpService: HttpClient) {}

  public cardSet = new Set();

  public saveCardsToLibrary(cards: Card[]) {
    removeDuplicates(cards);

    // json-server implementation
    // cards.forEach((card) => {
    //   this.httpService.post('http://localhost:3000/cards', card).subscribe(
    //     (response) => {
    //       return response;
    //     },
    //     (error) => {
    //       return error;
    //     }
    //   );
    // });
    let previousCards: Card[] = JSON.parse(
      localStorage.getItem('userCards') || '[]'
    );
    removeDuplicates(previousCards);
    removeDuplicates(cards);
    previousCards.forEach((prevCard) => {
      cards.forEach((card) => {
        if (card.id === prevCard.id) {
          let index: number = previousCards.findIndex(
            (item) => item.id === card.id
          );
          previousCards.splice(index, 1);
        }
      });
    });

    localStorage.setItem(
      'userCards',
      JSON.stringify([...previousCards, ...cards])
    );
  }

  public getCardsFromLibrary(): Observable<Card[]> {
    // json-server implementation
    //  return this.httpService.get<Card[]>('http://localhost:3000/cards/');

    const cards: Card[] = JSON.parse(localStorage.getItem('userCards') || '[]');
    return of(cards);
  }

  public unfavouriteCard(card: Card) {
    let previousCards: Card[] = JSON.parse(
      localStorage.getItem('userFavouriteCards') || '[]'
    );
    previousCards = previousCards.filter(
      (obj: Card) => JSON.stringify(obj) !== JSON.stringify(card)
    );

    localStorage.setItem('userFavouriteCards', JSON.stringify(previousCards));

    // json-server implementation
    //     return this.httpService.delete(
    //       'http://localhost:3000/favourites/' + card.id
    //     );
  }

  public favouriteCard(card: Card) {
    // json-server implementation
    // this.httpService.post('http://localhost:3000/favourites', card).subscribe(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     return error;
    //   }
    // );
    const previousCards: Card[] = JSON.parse(
      localStorage.getItem('userFavouriteCards') || '[]'
    );
    localStorage.setItem(
      'userFavouriteCards',
      JSON.stringify([...previousCards, card])
    );
  }
  public checkAlreadyHaveCard(card: Card): boolean {
    const cardCollection = JSON.parse(
      localStorage.getItem('userFavouriteCards') || '[]'
    );

    const alreadyHave =
      cardCollection.find(
        (obj: Card) => JSON.stringify(obj) === JSON.stringify(card)
      ) !== undefined;

    return alreadyHave;

    // json-server implementation
    // return this.httpService.get<Card[]>(
    //   'http://localhost:3000/cards?id=' + `${card.id}`
    // );
  }
  public checkAlreadyFavourited(card: Card): boolean {
    const favouriteCards = JSON.parse(
      localStorage.getItem('userFavouriteCards') || '[]'
    );

    const isFavourited =
      favouriteCards.find(
        (obj: Card) => JSON.stringify(obj) === JSON.stringify(card)
      ) !== undefined;

    return isFavourited;
    //return of (favouriteCards)
    // json-server implementation
    //     return this.httpService.get<Card[]>(
    //       'http://localhost:3000/favourites/?id=' + `${card.id}`
    //     );
  }
  public getFavouriteCards(): Observable<Card[]> {
    // json-server implementation
    // return this.httpService.get<Card[]>('http://localhost:3000/favourites/');

    const cards = JSON.parse(
      localStorage.getItem('userFavouriteCards') || '[]'
    );
    return of(cards);
  }

  public savePullTime() {
    const actualDate = new Date();
    localStorage.setItem('pullDate', actualDate.toDateString());
  }

  public getPullTime() {
    return localStorage.getItem('pullDate');
  }

  public saveTodayPull(cards: Card[]) {
    localStorage.setItem('todayPull', JSON.stringify(cards));
  }
  public getTodayPull(): Observable<Card[]> {
    const cards: Card[] = JSON.parse(localStorage.getItem('todayPull') || '[]');
    return of(cards);
  }
  public clearTodayPull() {
    localStorage.removeItem('todayPull');
    localStorage.removeItem('pullDate');
  }
}
