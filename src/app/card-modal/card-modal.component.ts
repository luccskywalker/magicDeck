import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'scryfall-sdk';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.less'],
})
export class CardModalComponent implements OnInit {
  @Input() card!: Card;

  constructor() {}

  ngOnInit() {}
}
