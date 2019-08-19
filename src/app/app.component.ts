import { Component } from '@angular/core';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { GameService } from 'src/serivces/game.service';
import { GameListenner } from 'src/interfaces/GameListenner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'cacaheute-objects/models/cacaheute.person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends GameListenner {

  title = 'Cacaheute';
  game: CacaheuteGame = undefined;
  person: Person = undefined;

  constructor(gameService: GameService, private snackbar: MatSnackBar) {
    super(gameService);
  }

  ngOnInit() {
  }

  init() {
    this.game = undefined;
    this.person = undefined;
    this.title = 'Cacaheute';
  }
  beforeGameCreation(game: CacaheuteGame): void {
  }

  onGameCreated(game: CacaheuteGame): void {
  }

  onGameRejoined(game: CacaheuteGame, person: Person): void {
    this.game = game;
    this.person = person;
    
    if(this.game.name && this.game.name.length > 0)
      this.title = game.name;
  }
}

