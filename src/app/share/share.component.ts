import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Card } from 'scryfall-sdk';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less'],
})
export class ShareComponent implements OnInit {
  constructor() {}
  @Input() cardList!: Card[];

  ngOnInit() {}
}
