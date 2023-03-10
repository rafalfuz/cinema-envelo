import { Component, inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, of, tap } from 'rxjs';
import { WatchListService } from 'src/app/movies/watch-list/watch-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogRateComponent } from '../dialog/dialog-rate.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Reperoire } from '../movies.interface';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent {
  @Input() movie!: Reperoire;

  declaredToWatchList: boolean = false;
  dialog = inject(MatDialog);
  router = inject(Router);
  user = inject(AuthService).auth$;
  watchListService = inject(WatchListService);
  toast = inject(ToastrService);

  isFullyBlown = false;

  currentUser!: string | null;

  handleVisibiltyDescription() {
    this.isFullyBlown = !this.isFullyBlown;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDeclareToWatchList(title: string) {
    if (!this.declaredToWatchList) {
      this.addToWatchList(title);
    } else {
      this.removeFromWatchList(title);
    }
  }

  addToWatchList(title: string) {
    this.watchListService.getMatchingRecord(title).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.watchListService.addMovieToWatchList(title);
          this.toast.success('Dodano do Chce obejrzeć!');
          this.declaredToWatchList = true;
        }
      },
      error: () => {
        this.toast.error('Ten record juz jest w bazie');
      },
    });
  }

  removeFromWatchList(title: string) {
    this.watchListService.removeFromWatchList(title);
    this.toast.success('Usunięto z Chce obejrzeć!');
    this.declaredToWatchList = false;
  }

  // checkDeclaredToWatchStatus() {
  //   const movieTitle = this.movie.movie.id;
  //   this.watchListService.watchList$.subscribe((data) => {
  //     data.map((data) => {
  //       if (data.movie === movieTitle && data.idUser === this.currentUser) {
  //         (this.declaredToWatchList) =  this.declaredToWatchList
  //       } else {
  //         this.declaredToWatchList = false;
  //       }
  //     });
  //   });
  // }

  navigateToReservation(
    day: string,
    time: string,
    cinemaRoomId: string,
    showingId: string
  ) {
    this.router.navigate(['/reservation', showingId, day, time, cinemaRoomId]);
  }

  ngOnInit() {
    this.user.pipe(
      tap({
        next: (data) => {
          this.currentUser = data.id;
        },
      })
    );

    if (this.watchListService.checkExist(this.movie.movie.id)) {
      this.declaredToWatchList = true;
    }
    // this.checkDeclaredToWatchStatus();
  }
}
