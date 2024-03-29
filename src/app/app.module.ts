import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { PullModule } from './pull/pull.module';
import { HomeComponent } from './home/home.component';
import { PullComponent } from './pull/pull.component';
import { UserDeckComponent } from './user-deck/user-deck.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { CommonModule } from '@angular/common';
import { UserLibraryModule } from './user-library/user-library.module';
import { SetsComponent } from './sets/sets.component';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { ManaPipe } from 'src/app/utils/pipes/mana.pipe';
import { UserDeckModule } from './user-deck/user-deck.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'pull', pathMatch: 'full', component: PullComponent },
  { path: 'deck', pathMatch: 'full', component: UserDeckComponent },
  { path: 'library', pathMatch: 'full', component: UserLibraryComponent },
  { path: 'sets', pathMatch: 'full', component: SetsComponent },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    PullModule,
    HomeModule,
    UserLibraryModule,
    RouterModule.forRoot(appRoutes),
    PipesModule,
    UserDeckModule,
    LazyLoadImageModule,
  ],
  providers: [AppModule],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
