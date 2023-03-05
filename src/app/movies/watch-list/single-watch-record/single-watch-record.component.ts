import { Component, inject, Input } from '@angular/core';
import { Movies } from '../../movies.interface';

import { WatchListService } from '../watch-list.service';

@Component({
  selector: 'app-single-watch-record[showRecord]',
  templateUrl: './single-watch-record.component.html',
  styleUrls: ['./single-watch-record.component.css'],
})
export class SingleWatchRecordComponent {
  @Input() showRecord!: Movies;
  declaredToWatch?: boolean;
  watchListService = inject(WatchListService);
  apiLoaded = false;
  currentVideoId: string | null = null;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    // if (this.watchListService.checkExist(this.showRecord.title)) {
    //   this.declaredToWatch = true;
    // }
  }

  selectVideo(video: Movies) {
    const params = new URL(video.videoId).searchParams;
    this.currentVideoId = params.get('v');
  }

  remove(title: string) {
    this.watchListService.removeFromWatchList(title);
    this.declaredToWatch = false;
  }
}
