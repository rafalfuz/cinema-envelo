import { Component } from '@angular/core';

enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

@Component({
  selector: 'app-dialog-rate',
  templateUrl: 'dialog-rate.component.html',
  styleUrls: ['./dialog-rate.component.css'],
})
export class DialogRateComponent {
  // rating: number = 3;
  // starCount: number = 5;
  // starColor: StarRatingColor = StarRatingColor.accent;
  // starColorP: StarRatingColor = StarRatingColor.primary;
  // starColorW: StarRatingColor = StarRatingColor.warn;

  ngOnInit() {}
  // onRatingChanged(rating: any) {
  //   console.log(rating);
  //   this.rating = rating;
  // }
}
