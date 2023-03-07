import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { CalendarComponent } from './movies/calendar/calendar.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ListOfMoviesComponent } from './movies/repertoure/list-of-movies.component';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { FootbarComponent } from './shared/components/footbar/footbar.component';
import { MaterialModule } from 'src/material.module';
import { ToastrModule } from 'ngx-toastr';
import { WatchListComponent } from './movies/watch-list/watch-list.component';
import { SingleWatchRecordComponent } from './movies/watch-list/single-watch-record/single-watch-record.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DialogRateComponent } from './movies/dialog/dialog-rate.component';
import { AuthService } from './auth/auth.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

function initFactory(initService: AuthService) {
  return () => initService.autoLogin();
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CalendarComponent,
    LoginFormComponent,
    ListOfMoviesComponent,
    SingleMovieComponent,
    TruncatePipe,
    PageNotFoundComponent,
    FootbarComponent,
    WatchListComponent,
    SingleWatchRecordComponent,
    DialogRateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    YouTubePlayerModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
