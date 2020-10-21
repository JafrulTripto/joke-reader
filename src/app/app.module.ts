import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { JokeOperationsComponent } from './main-content/joke-operations/joke-operations.component';
import { JokeListComponent } from './main-content/joke-list/joke-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditJokeComponent } from './main-content/edit-joke/edit-joke.component';
import { PlayJokeComponent } from './main-content/joke-operations/play-joke/play-joke.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    JokeOperationsComponent,
    JokeListComponent,
    EditJokeComponent,
    PlayJokeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
