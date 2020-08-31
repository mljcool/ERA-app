import { Component, Input, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'star-rating-era',
  templateUrl: 'star-rating.html',
  styleUrls: ['./star-rating.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarRatingComponent {
  @Input('options') options: any;

  constructor() {}
}
