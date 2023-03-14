import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from 'scryfall-sdk';

@Injectable({
  providedIn: 'root',
})
export class MagicServiceService {
  constructor(private httpService: HttpClient) {}

  public saveCardsToLibrary(cards: Card[]) {
    cards.forEach((card) => {
      this.httpService.post('http://localhost:3000/cards', card).subscribe(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    });

    localStorage.setItem('userCards', JSON.stringify(cards));
  }

  public getCardsFromLibrary(): Observable<Card[]> {
    const cards = JSON.parse(localStorage.getItem('userCards') || '{}');
    return of(cards);

    // json-server implementation
    //  return this.httpService.get<Card[]>('http://localhost:3000/cards/');
  }

  public unfavouriteCard(card: Card) {
    return this.httpService.delete(
      'http://localhost:3000/favourites/' + card.id
    );
  }

  public favouriteCard(card: Card) {
    localStorage.setItem('userFavouriteCards', JSON.stringify(card));

    // json-server implementation
    // this.httpService.post('http://localhost:3000/favourites', card).subscribe(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     return error;
    //   }
    // );
  }
  public checkAlreadyHaveCard(card: Card): Observable<Card[]> {
    return this.httpService.get<Card[]>(
      'http://localhost:3000/cards?id=' + `${card.id}`
    );
  }
  public checkAlreadyFavourited(card: Card): Observable<Card[]> {
    return this.httpService.get<Card[]>(
      'http://localhost:3000/favourites/?id=' + `${card.id}`
    );
  }
  public getFavouriteCards(): Observable<Card[]> {
    return this.httpService.get<Card[]>('http://localhost:3000/favourites/');
  }
}
