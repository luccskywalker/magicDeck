import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { PullModule } from './pull/pull.module';
import { HomeComponent } from './home/home.component';
import { PullComponent } from './pull/pull.component';
import { UserDeckComponent } from './user-deck/user-deck.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'pull', pathMatch: 'full', component: PullComponent },
  { path: 'deck', pathMatch: 'full', component: UserDeckComponent },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PullModule,
    HomeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AppModule],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
