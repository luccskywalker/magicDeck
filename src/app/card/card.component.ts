import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
  @Input() img!: string | undefined;
  @Input() isHolo = false;

  constructor() {}

  ngOnInit() {}
}
