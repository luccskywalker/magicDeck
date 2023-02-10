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
    this.httpService.post('http://localhost:3000/cards', cards).subscribe(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );
  }
  public getCardsFromLibrary() {
    console.log("this.cardsService.put('http://localhost:3000/cartas', cards)");
    return this.httpService.get('http://localhost:3000/cards');
  }
}
