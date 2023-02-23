import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  }
  public getCardsFromLibrary(): Observable<Card[]> {
    return this.httpService.get<Card[]>('http://localhost:3000/cards');
  }
}
