// import {
//   Component,
//   EventEmitter,
//   inject,
//   Output,
//   ViewEncapsulation,
// } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

// enum StarRatingColor {
//   primary = 'primary',
//   accent = 'accent',
//   warn = 'warn',
// }

// @Component({
//   selector: 'mat-star-rating',
//   templateUrl: './star-rating.component.html',
//   styleUrls: ['./star-rating.component.css'],
//   encapsulation: ViewEncapsulation.Emulated,
// })
// export class StarRatingComponent {
//   color = 'starColor';
//   rating: number = 3;
//   starCount: number = 10;
//   starColor: StarRatingColor = StarRatingColor.accent;
//   starColorP: StarRatingColor = StarRatingColor.primary;
//   starColorW: StarRatingColor = StarRatingColor.warn;
//   @Output() private ratingUpdated = new EventEmitter();

//   ratingArr: any = [];

//   toast = inject(ToastrService);

//   ngOnInit() {
//     console.log('a ' + this.starCount);
//     for (let index = 0; index < this.starCount; index++) {
//       this.ratingArr.push(index);
//     }
//   }

//   onClick(rating: number) {
//     console.log(rating);
//     this.toast.success('Oceniłeś ten film ' + rating + '!');
//     this.ratingUpdated.emit(rating);
//     return false;
//   }

//   showIcon(index: number) {
//     if (this.rating >= index + 1) {
//       return 'star';
//     } else {
//       return 'star_border';
//     }
//   }
// }
